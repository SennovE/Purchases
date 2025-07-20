import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class OrderPatch(BaseModel):
    date: datetime.date | None = None
    initiator: str | None = None
    by_order: str | None = None
    by_bank: str | None = None
    source: str | None = None
    country: str | None = None
    address: str | None = None
    paid: float | None = None


class ItemPatch(BaseModel):
    name: str | None = None
    count: int | None = None
    price_by_one: float | None = None
    return_count: int | None = None
    return_check: bool | None = None
    return_date: datetime.date | None = None


class ItemPost(ItemPatch):
    order_id: UUID


class OrderRespose(OrderPatch):
    id: UUID
    total_amount: float

    model_config = ConfigDict(from_attributes=True)


class ItemRespose(ItemPatch):
    id: UUID

    model_config = ConfigDict(from_attributes=True)


class OrderChoices(BaseModel):
    initiator: list[str] = []
    by_order: list[str] = []
    by_bank: list[str] = []
    source: list[str] = []
    country: list[str] = []
    address: list[str] = []
