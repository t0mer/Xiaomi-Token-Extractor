from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from loguru import logger

from .api.v1 import devices
from .core.config import settings

app = FastAPI(
    title="Xiaomi Token Extractor",
    version="1.7.0",
    docs_url="/api/docs",
)


@app.get("/health")
def health():
    return {"status": "ok", "version": app.version}


app.include_router(devices.router, prefix="/api/v1")

static_dir = Path(__file__).parent.parent / "static"
if static_dir.exists():
    app.mount("/", StaticFiles(directory=str(static_dir), html=True), name="static")
