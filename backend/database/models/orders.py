from datetime import datetime

from sqlalchemy import (
    UUID,
    Boolean,
    Column,
    Date,
    DateTime,
    Double,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship

from database import Model


class Orders(Model):
    __tablename__ = "orders"

    date = Column(Date)
    initiator = Column(String)
    by_order = Column(String)
    by_bank = Column(String)
    source = Column(String)
    paid = Column(Double)
    country = Column(String)
    address = Column(String)

    items = relationship(
        "Items",
        back_populates="order",
        cascade="all, delete-orphan",
        lazy="selectin",
    )


class Items(Model):
    __tablename__ = "items"

    order_id = Column(UUID, ForeignKey("orders.id", ondelete="CASCADE"))
    name = Column(String)
    count = Column(Integer)
    price_by_one = Column(Double)
    return_count = Column(Integer)
    return_check = Column(Boolean, default=False)
    return_date = Column(Date)
    created_dt = Column(DateTime, default=datetime.now)

    order = relationship("Orders", back_populates="items")
