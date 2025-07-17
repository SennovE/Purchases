from uuid import UUID

from pydantic import BaseModel
from sqlalchemy import delete, insert, select, update

from database.connection import db


class CRUDManager:
    def __init__(self, model):
        self.model = model

    async def insert(self, item: BaseModel) -> None:
        async with db.get_session() as session:
            query = insert(self.model).values(**item.model_dump())
            await session.execute(query)
            await session.commit()

    async def delete(self, id: UUID) -> None:
        async with db.get_session() as session:
            query = delete(self.model).where(self.model.id == id)
            await session.execute(query)
            await session.commit()

    async def update(self, id: UUID, item: BaseModel) -> None:
        async with db.get_session() as session:
            query = (
                update(self.model)
                .where(self.model.id == id)
                .values(**item.model_dump(exclude_unset=True))
            )
            await session.execute(query)
            await session.commit()

    async def select_all(self) -> list:
        async with db.get_session() as session:
            query = select(self.model)
            return await session.scalars(query)
