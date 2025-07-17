from fastapi import Request

from database.connection import db


async def create_context_session(request: Request, call_next):
    async with db.get_session():
        return await call_next(request)
