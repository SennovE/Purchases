from api.items import router as items_router
from api.orders import router as order_router
from api.ping import router as ping_router

routes = [ping_router, order_router, items_router]
