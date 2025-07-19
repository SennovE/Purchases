from datetime import datetime
from uuid import uuid4

from sqlalchemy import UUID, Column, DateTime
from sqlalchemy.orm import DeclarativeBase


class Model(DeclarativeBase):
    __abstract__ = True

    id = Column(
        UUID,
        primary_key=True,
        default=uuid4,
        unique=True,
    )
    created_dt = Column(DateTime, default=datetime.now)


__all__ = ["Model"]
