from sqlalchemy import select
from sqlalchemy.orm import selectinload

from api.models.orders import OrderChoices, OrderWithItems
from database.connection import db
from database.models import Orders


async def select_orders_with_items() -> list[OrderWithItems]:
    async with db.get_session() as session:
        query = select(Orders).options(selectinload(Orders.items))
        orders = await session.scalars(query)
        return list(
            OrderWithItems(
                order=o,
                items=o.items,
            )
            for o in orders
        )


async def select_unique_values() -> OrderChoices:
    async with db.get_session() as session:
        temp: dict[str, list] = {}
        for column in Orders.__table__.columns:
            if column.name in OrderChoices.model_fields:
                query = select(column).where(column != None).distinct()  # noqa: E711
                temp[column.name] = await session.scalars(query)
        return OrderChoices(**temp)
