# -*- coding: utf-8 -*-
import base64, hashlib, hmac, json, os, time, requests, random
from flask import Flask, request, make_response, render_template, url_for, g, send_from_directory, jsonify, send_file
from flask_restful import Resource, Api
from json import dumps
from loguru import logger
from XiaomiCloudConnector import XiaomiCloudConnector
from collections import namedtuple


_devices = []
Device = namedtuple('Device', ['server', 'name', 'id', 'ble_key', 'token', 'model', 'ip', "mac"])
servers = ["cn", "de", "us", "ru", "tw", "sg", "in", "i2"]
servers_str = ", ".join(servers)
username = os.getenv("XIA_USER")
password = os.getenv("XIA_PASS")
server = os.getenv("XIA_SRV")

app = Flask(__name__)
api = Api(app)









@app.route('/')
def default():
    return render_template('index.html')


@app.route('/devices')
def devices():
    try:
        _devices = []
        connector = XiaomiCloudConnector(username, password)
        logger.info(username)
        logger.info(password)
        logged = connector.login()
        logger.info("logged: " + str(logged))
        if logged:
            logger.info("Logged In")
            for current_server in servers:
                server = current_server
                name=''
                id=''
                ble_key=''
                token=''
                model=''
                ip=''
                mac = ''

                devices = connector.get_devices(current_server)
                if devices is not None:
                    if len(devices["result"]["list"]) == 0:
                        continue
                    for device in devices["result"]["list"]:
                        if "name" in device:
                            name = device["name"]
                        if "did" in device:
                            id = device["did"]
                            if "blt" in device["did"]:
                                beaconkey = connector.get_beaconkey(current_server, device["did"])
                                if beaconkey and "result" in beaconkey and "beaconkey" in beaconkey["result"]:
                                    ble_key = beaconkey["result"]["beaconkey"]
                        if "localip" in device:
                            ip = device["localip"]
                        if "mac" in device:
                            mac = device["mac"]
                        if "token" in device:
                            token = device["token"]
                        if "model" in device:
                            model = device["model"]
                        _devices.append(Device(current_server, name, id, ble_key, token, model, ip, mac))
                else:
                    return jsonify('{"error":1","data":"Something went wrong please refer to error log"}')
            return jsonify(_devices)
        else:
            return jsonify('{"error":1","data":"Something went wrong please refer to error log"}')
    except Exception as e:
        logger.error(str(e))
        return jsonify('{"error":1","data":"Something went wrong please refer to error log"}')


@app.route('/srv')
def servers_list():
    return str(servers)

# Serve Javascript
@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)


@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

# Start Application
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
