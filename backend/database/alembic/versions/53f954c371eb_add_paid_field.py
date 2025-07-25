"""Add paid field

Revision ID: 53f954c371eb
Revises: ca17860e0e51
Create Date: 2025-07-19 15:01:56.818017

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "53f954c371eb"
down_revision: Union[str, None] = "ca17860e0e51"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("orders", sa.Column("paid", sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("orders", "paid")
    # ### end Alembic commands ###
