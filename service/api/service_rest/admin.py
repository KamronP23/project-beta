from django.contrib import admin

from .models import AutosVO, Technician, Service


@admin.register(AutosVO)
class AutosVOAdmin(admin.ModelAdmin):
    pass


@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    pass
