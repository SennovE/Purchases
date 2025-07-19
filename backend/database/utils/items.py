from uuid import UUID

from sqlalchemy import select

from database.connection import db
from database.models import Items


async def select_items_by_order_id(id: UUID) -> list[Items]:
    async with db.get_session() as session:
        query = (
            select(Items)
            .where(Items.order_id == id)
            .order_by(Items.created_dt)
        )
        return await session.scalars(query)
