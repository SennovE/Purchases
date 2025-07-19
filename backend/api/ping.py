from fastapi import APIRouter, Depends, status

from utils.jwt import check_token

router = APIRouter(prefix="/ping", tags=["Ping"])


@router.get("", status_code=status.HTTP_200_OK)
def check_health() -> None:
    return


@router.get("/me", status_code=status.HTTP_200_OK)
def check_me(_=Depends(check_token)) -> None:
    return
