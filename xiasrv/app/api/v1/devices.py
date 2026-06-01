from fastapi import APIRouter, HTTPException
from loguru import logger
from pydantic import BaseModel

from XiaomiCloudConnector import XiaomiCloudConnector
from ...core.config import settings

router = APIRouter()

SERVERS = ["cn", "de", "us", "ru", "tw", "sg", "in", "i2"]


class Device(BaseModel):
    server: str
    name: str
    id: str
    ble_key: str
    token: str
    model: str
    ip: str
    mac: str


@router.get("/devices", response_model=list[Device])
def get_devices():
    try:
        connector = XiaomiCloudConnector(settings.xia_user, settings.xia_pass)
        if not connector.login():
            raise HTTPException(status_code=500, detail="Login failed — check XIA_USER and XIA_PASS")

        servers = [settings.xia_srv] if settings.xia_srv else SERVERS
        result: list[Device] = []
        for srv in servers:
            data = connector.get_devices(srv)
            if data is None:
                logger.warning(f"No response from server {srv}")
                continue
            for dev in data.get("result", {}).get("list", []):
                did = dev.get("did", "")
                ble_key = ""
                if "blt" in did:
                    beacon = connector.get_beaconkey(srv, did)
                    if beacon and "result" in beacon and "beaconkey" in beacon["result"]:
                        ble_key = beacon["result"]["beaconkey"]
                result.append(Device(
                    server=srv,
                    name=dev.get("name", ""),
                    id=did,
                    ble_key=ble_key,
                    token=dev.get("token", ""),
                    model=dev.get("model", ""),
                    ip=dev.get("localip", ""),
                    mac=dev.get("mac", ""),
                ))
        return result
    except HTTPException:
        raise
    except Exception as exc:
        logger.error(f"Error fetching devices: {exc}")
        raise HTTPException(status_code=503, detail=str(exc))
