BACKEND_FOLDER = ./backend

format:
	cd $(BACKEND_FOLDER) && uv run ruff format .
	cd $(BACKEND_FOLDER) && uv run ruff check --fix .

check:
	cd $(BACKEND_FOLDER) && uv run ruff check
	cd $(BACKEND_FOLDER) && uv run mypy .

run:
	docker compose up --build --watch

deploy:
	docker compose up --build -d
