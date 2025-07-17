from uuid import UUID

from fastapi import APIRouter, Depends, status

from api.models.orders import OrderPatch, OrderPost, OrderWithItems
from database.models import Orders
from database.utils.crud import CRUDManager
from database.utils.orders import add_order_with_items, select_orders_with_items
from utils.jwt import check_token

router = APIRouter(
    prefix="/order", tags=["Orders"], dependencies=[Depends(check_token)]
)
orders_crud_manager = CRUDManager(Orders)


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_order(order: OrderPost) -> None:
    await add_order_with_items(order)


@router.patch("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def patch_order(id: UUID, order: OrderPatch) -> None:
    await orders_crud_manager.update(id, order)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_order(id: UUID) -> None:
    await orders_crud_manager.delete(id)


@router.get("", status_code=status.HTTP_200_OK)
async def get_orders() -> list[OrderWithItems]:
    return await select_orders_with_items()
