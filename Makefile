BACKEND_FOLDER = ./backend

format:
	cd $(BACKEND_FOLDER) && uv run ruff format .
	cd $(BACKEND_FOLDER) && uv run ruff check --fix .

check:
	cd $(BACKEND_FOLDER) && uv run ruff check
	cd $(BACKEND_FOLDER) && uv run mypy .

run:
	docker compose up postgres backend frontend --build --watch

deploy:
	docker compose up postgres backend nginx renew --build -d

get-certs:
	docker compose run --rm certbot certonly --noninteractive --agree-tos \
		--webroot -w /var/www/certbot \
		-d purchases.ddns.net
