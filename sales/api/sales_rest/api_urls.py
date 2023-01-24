from django.urls import path
from .api_views import api_list_salesperson, api_list_customer, api_list_automobilesvo

urlpatterns = [
    path("salespersons/", api_list_salesperson, name='api_create_salespersons'),
    path("customer/", api_list_customer, name="api_create_customer"),
    path("automobiles/", api_list_automobilesvo, name="automobile_list"),
]