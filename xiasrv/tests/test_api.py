import pytest
from fastapi.testclient import TestClient


@pytest.fixture
def client():
    from app.main import app
    return TestClient(app)


def test_health(client):
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "version" in data


from unittest.mock import MagicMock, patch


def test_get_devices_success(client):
    mock = MagicMock()
    mock.login.return_value = True
    mock.get_devices.side_effect = lambda srv: (
        {"result": {"list": [
            {"name": "Mi Vacuum", "did": "123", "token": "abc123",
             "model": "roborock.sweep", "localip": "192.168.1.1", "mac": "AA:BB"}
        ]}} if srv == "cn" else {"result": {"list": []}}
    )
    mock.get_beaconkey.return_value = None

    with patch("app.api.v1.devices.XiaomiCloudConnector", return_value=mock):
        response = client.get("/api/v1/devices")

    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == "Mi Vacuum"
    assert data[0]["server"] == "cn"
    assert data[0]["ble_key"] == ""


def test_get_devices_login_failure(client):
    mock = MagicMock()
    mock.login.return_value = False

    with patch("app.api.v1.devices.XiaomiCloudConnector", return_value=mock):
        response = client.get("/api/v1/devices")

    assert response.status_code == 500
    assert "Login failed" in response.json()["detail"]


def test_get_devices_ble_key_populated(client):
    mock = MagicMock()
    mock.login.return_value = True
    mock.get_devices.side_effect = lambda srv: (
        {"result": {"list": [
            {"name": "BLE Light", "did": "blt.abc", "token": "t1",
             "model": "yeelink.light", "localip": "", "mac": "CC:DD"}
        ]}} if srv == "cn" else {"result": {"list": []}}
    )
    mock.get_beaconkey.return_value = {"result": {"beaconkey": "beacon99"}}

    with patch("app.api.v1.devices.XiaomiCloudConnector", return_value=mock):
        response = client.get("/api/v1/devices")

    assert response.status_code == 200
    assert response.json()[0]["ble_key"] == "beacon99"
