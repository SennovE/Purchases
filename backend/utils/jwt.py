from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from settings import settings

oauth2_scheme = HTTPBearer()


def check_token(
    token: Annotated[HTTPAuthorizationCredentials, Depends(oauth2_scheme)],
) -> None:
    if token.credentials not in settings.tokens:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
