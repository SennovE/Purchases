from fastapi import FastAPI
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from uvicorn import run

from api import routes
from middleware import create_context_session
from settings import settings

MIDDLEWARE = [Middleware(BaseHTTPMiddleware, dispatch=create_context_session)]


def register_routes(app: FastAPI) -> None:
    for route in routes:
        app.include_router(route, prefix="/api")


app = FastAPI(
    docs_url="/api/swagger",
    openapi_url="/api/openapi",
    version="1.0.0",
    debug=True,
    middleware=MIDDLEWARE,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_routes(app)

if __name__ == "__main__":
    run(
        app="main:app",
        host=settings.app_host,
        port=settings.app_port,
        reload=True,
        log_level="debug",
    )
