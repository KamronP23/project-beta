from django.urls import path
from .api_views import api_list_salesperson, api_list_customer

urlpatterns = [
    path("salespersons/", api_list_salesperson, name='api_create_salespersons'),
    path("customer/", api_list_customer, name="api_create_customer"),
]