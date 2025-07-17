FROM python:3.12-alpine

WORKDIR /backend

RUN pip install uv

COPY pyproject.toml uv.lock /backend/

RUN uv sync --locked

COPY . /backend/

CMD cd database/ && uv run alembic upgrade head && cd .. && uv run main.py