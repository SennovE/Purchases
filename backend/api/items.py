from uuid import UUID

from fastapi import APIRouter, Depends, status

from api.models.orders import ItemPatch, ItemPost, ItemRespose
from database.models import Items
from database.utils.crud import CRUDManager
from database.utils.items import select_items_by_order_id
from utils.jwt import check_token

router = APIRouter(prefix="/item", tags=["Items"], dependencies=[Depends(check_token)])
items_manager = CRUDManager(Items)


@router.post("/{order_id}", status_code=status.HTTP_201_CREATED)
async def create_item(order_id: UUID):
    await items_manager.insert(ItemPost(order_id=order_id))


@router.patch("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def patch_item(id: UUID, item: ItemPatch):
    await items_manager.update(id, item)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_item(id: UUID):
    await items_manager.delete(id)


@router.get("/{id}", status_code=status.HTTP_200_OK)
async def get_orders(id: UUID) -> list[ItemRespose]:
    return await select_items_by_order_id(id)
