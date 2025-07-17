import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class OrderBase(BaseModel):
    date: datetime.date
    initiator: str
    by_order: str
    by_bank: str
    source: str
    country: str
    address: str


class OrderPatch(OrderBase):
    date: datetime.date | None = None
    initiator: str | None = None
    by_order: str | None = None
    by_bank: str | None = None
    source: str | None = None
    country: str | None = None
    address: str | None = None


class ItemBase(BaseModel):
    name: str
    count: int
    price_by_one: float
    check: bool
    return_count: int | None = None
    return_check: bool | None = None
    return_date: datetime.date | None = None


class ItemPost(ItemBase):
    order_id: UUID


class ItemPatch(ItemPost):
    name: str | None = None
    count: int | None = None
    price_by_one: float | None = None
    check: bool | None = None


class OrderPost(BaseModel):
    order: OrderBase
    items: list[ItemBase]


class OrderRespose(OrderBase):
    id: UUID

    model_config = ConfigDict(from_attributes=True)


class ItemRespose(ItemBase):
    id: UUID

    model_config = ConfigDict(from_attributes=True)


class OrderWithItems(BaseModel):
    order: OrderRespose
    items: list[ItemRespose]

    model_config = ConfigDict(from_attributes=True)
