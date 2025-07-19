from uuid import uuid4

from sqlalchemy import (
    UUID,
    Boolean,
    Column,
    Date,
    Double,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship

from database import DBBaseModel


class Orders(DBBaseModel):
    __tablename__ = "orders"

    id = Column(
        UUID,
        primary_key=True,
        default=uuid4,
        unique=True,
    )
    date = Column(Date)
    initiator = Column(String)
    by_order = Column(String)
    by_bank = Column(String)
    source = Column(String)
    country = Column(String)
    address = Column(String)

    items = relationship(
        "Items",
        back_populates="order",
        cascade="all, delete-orphan",
        lazy="selectin",
    )


class Items(DBBaseModel):
    __tablename__ = "items"

    id = Column(
        UUID,
        primary_key=True,
        default=uuid4,
        unique=True,
    )
    order_id = Column(UUID, ForeignKey("orders.id", ondelete="CASCADE"))
    name = Column(String)
    count = Column(Integer)
    price_by_one = Column(Double)
    check = Column(Boolean, default=False)
    return_count = Column(Integer)
    return_check = Column(Boolean, default=False)
    return_date = Column(Date)

    order = relationship("Orders", back_populates="items")
