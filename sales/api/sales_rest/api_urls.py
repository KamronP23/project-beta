from django.urls import path
from .api_views import api_list_salesperson

urlpatterns = [
    path("salespersons/", api_list_salesperson, name='api_create_salespersons')
]