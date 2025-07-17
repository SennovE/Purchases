from contextlib import asynccontextmanager
from contextvars import ContextVar
from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from settings import settings

engine = create_async_engine(
    url=settings.postgres.async_url,
    echo=True,
    future=True,
    pool_size=200,
    max_overflow=0,
)

context_session = ContextVar("context_session", default=None)
is_transaction_started = ContextVar("context_transaction", default=False)


class DatabaseSessionManager:
    def __init__(self) -> None:
        self._sessionmaker = async_sessionmaker(engine)

    @asynccontextmanager
    async def get_session(self) -> AsyncGenerator[AsyncSession, None]:
        if session := context_session.get():
            yield session
            return

        async with self._sessionmaker() as session:
            context_session.set(session)
            try:
                yield session
            finally:
                context_session.set(None)

    @asynccontextmanager
    async def begin_transaction(self) -> AsyncGenerator[AsyncSession, None]:
        async with self.get_session() as session:
            if is_transaction_started.get():
                yield session
                return

            is_transaction_started.set(True)
            try:
                yield session
            except:
                await session.rollback()
                raise
            else:
                await session.commit()
            finally:
                is_transaction_started.set(False)


db = DatabaseSessionManager()
