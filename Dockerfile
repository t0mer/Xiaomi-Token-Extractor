# Stage 1: Build React frontend
FROM node:24-alpine AS frontend
WORKDIR /app/web
COPY web/package*.json ./
RUN npm ci --silent
COPY web/ ./
RUN npm run build
# Output lands at /app/xiasrv/static (vite outDir is ../xiasrv/static)

# Stage 2: Python runtime
FROM python:3.12-slim

LABEL maintainer="tomer.klein@gmail.com"

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    XIA_USER="" \
    XIA_PASS="" \
    XIA_SRV="" \
    LOG_LEVEL="info"

RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/xiasrv

COPY xiasrv/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY xiasrv/ .
COPY --from=frontend /app/xiasrv/static ./static

RUN useradd --create-home --uid 10001 appuser \
    && chown -R appuser:appuser /opt/xiasrv
USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -fsS http://127.0.0.1:8080/health || exit 1

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
