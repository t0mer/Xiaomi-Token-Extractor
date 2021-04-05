# Xiaomi Token Extractor
## Extract your xiaomi devices token

Xiaomi Token Extractor is a Python & [Flask](https://flask.palletsprojects.com/en/1.1.x/) powerd, easy to use system that hepls us to easely extrat our Xiaomi devices tokens from the cloud in order to easelly integrate them into our smart home (HA, HB etc'). 

## Credits
Thanks to [https://github.com/tzungtzu](https://github.com/tzungtzu/Xiaomi-cloud-tokens-extractor) that did the hard work i was able to create this docker with web interface.

## Installation
#### docker-compose from hub
```yaml
version: "3.7"

services:
  xiaomi_token_extractor:
    image: techblog/xiaomi_token_extractor:latest
    container_name: xiaomi_token_extractor
    restart: always
    labels:
      - "com.ouroboros.enable=true"
    environment:
      - XIA_USER=
      - XIA_PASS=
      - XIA_SRV=  #Optional: ["cn", "de", "us", "ru", "tw", "sg", "in", "i2"]
    ports:
      - "8080:8080"

```
Now, run ```docker-copmose up -d``` to pull and run your container.
Open your browser and nevigate to your container ip address wieh port 8080, you should see the following screen.

[![Xiaomi Token Extractor](https://github.com/t0mer/Xiaomi-Token-Extractor/blob/main/screenshots/xiaomi_token_extractor.jpg?raw=true "Xiaomi Token Extractor")](https://github.com/t0mer/Xiaomi-Token-Extractor/blob/main/screenshots/Xiaomi-Token-Extractor.jpg?raw=true "Xiaomi Token Extractor")

*Please :star: this repo if you find it useful*

<p align="left"><br>
<a href="https://www.paypal.com/paypalme/techblogil?locale.x=he_IL" target="_blank"><img src="http://khrolenok.ru/support_paypal.png" alt="PayPal" width="250" height="48"></a>
</p>



