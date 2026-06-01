*Please :star: this repo if you find it useful*

# Xiaomi Token Extractor

Extract your Xiaomi device tokens directly from the cloud via a modern web interface.

Built with **React + Vite** (frontend) and **FastAPI** (backend), served from a single Docker container.

## Features

- Fetches devices from all Xiaomi regional servers (cn, de, us, ru, tw, sg, in, i2)
- One-click copy for Token and BLE Key values
- Instant search across all device fields
- Dark / light mode toggle
- Responsive — card layout on mobile, full table on desktop

## Quick Start

```yaml
services:
  xiaomi_token_extractor:
    image: techblog/xiaomi_token_extractor:latest
    container_name: xiaomi_token_extractor
    restart: always
    environment:
      - XIA_USER=your@email.com
      - XIA_PASS=yourpassword
      - XIA_SRV=          # optional: cn, de, us, ru, tw, sg, in, i2
    ports:
      - "8080:8080"
```

```bash
docker-compose up -d
```

Open `http://<host>:8080` in your browser.

## Credits

Thanks to [tzungtzu](https://github.com/tzungtzu/Xiaomi-cloud-tokens-extractor) for the original cloud connector.
