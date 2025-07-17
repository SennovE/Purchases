from typing import Type

from sqlalchemy import MetaData
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm.decl_api import DeclarativeMeta

metadata = MetaData()
DBBaseModel: Type[DeclarativeMeta] = declarative_base(metadata=metadata)

__all__ = ["DBBaseModel"]
