from sqlalchemy import select

from api.models.orders import OrderChoices
from database.connection import db
from database.models import Orders


async def select_unique_values() -> OrderChoices:
    async with db.get_session() as session:
        temp: dict[str, list] = {}
        for column in Orders.__table__.columns:
            if column.name in OrderChoices.model_fields:
                query = select(column).where(column != None).distinct()  # noqa: E711
                temp[column.name] = await session.scalars(query)
        return OrderChoices(**temp)
