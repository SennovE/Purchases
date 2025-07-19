from uuid import UUID

from fastapi import APIRouter, Depends, status

from api.models.orders import ItemPatch, ItemPost
from database.models import Items
from database.utils.crud import CRUDManager
from utils.jwt import check_token

router = APIRouter(prefix="/item", tags=["Items"], dependencies=[Depends(check_token)])
items_manager = CRUDManager(Items)


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_item(order_id: UUID):
    await items_manager.insert(ItemPost(order_id=order_id))


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_item(id: UUID):
    await items_manager.delete(id)


@router.patch("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def patch_item(id: UUID, item: ItemPatch):
    await items_manager.update(id, item)
