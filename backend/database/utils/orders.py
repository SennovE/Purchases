from sqlalchemy import insert, select
from sqlalchemy.orm import selectinload

from api.models.orders import OrderPost, OrderWithItems
from database.connection import db
from database.models import Items, Orders


async def add_order_with_items(order_post: OrderPost) -> None:
    async with db.get_session() as session:
        order_query = (
            insert(Orders).values(**order_post.order.model_dump()).returning(Orders.id)
        )
        result = await session.execute(order_query)
        order_id = result.scalar_one()
        items_data = [
            {**item.model_dump(), "order_id": order_id} for item in order_post.items
        ]
        if items_data:
            await session.execute(insert(Items), items_data)
        await session.commit()


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
