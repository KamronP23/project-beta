from django.urls import path
from .api_views import api_list_salesperson, api_list_customer, api_list_automobilesvo, api_list_sales, api_show_salesperson, api_sales_details

urlpatterns = [
    path("salespersons/", api_list_salesperson, name='api_create_salespersons'),
    path("customer/", api_list_customer, name="api_create_customer"),
    path("automobiles/", api_list_automobilesvo, name="automobile_list"),
    path("sales/", api_list_sales, name='api_create_sales'),
    path("sales/<int:pk>/", api_sales_details, name="api_sales_details"),
    path("salespersons/<int:pk>", api_show_salesperson, name="api_show_salesperson"),



]