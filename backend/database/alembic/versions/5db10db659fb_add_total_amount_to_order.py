"""Add total amount to order

Revision ID: 5db10db659fb
Revises: 47a918d77fef
Create Date: 2025-07-20 14:11:05.700529

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5db10db659fb'
down_revision: Union[str, None] = '47a918d77fef'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('items', 'check')
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('items', sa.Column('check', sa.BOOLEAN(), autoincrement=False, nullable=True))
    # ### end Alembic commands ###
