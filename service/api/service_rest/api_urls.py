from django.urls import path

from .api_views import api_list_services, api_show_service, api_list_technicians, api_list_autosVOs

urlpatterns = [
    path("services/", api_list_services, name="api_create_service"),
    path("autosVOs/", api_list_autosVOs, name="api_list_autosVOs"),
    path("services/<int:pk>/", api_show_service, name="api_show_service"),
    path("technicians/", api_list_technicians, name="api_create_technician"),
]