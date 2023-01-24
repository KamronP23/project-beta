from django.contrib import admin
from .models import Sales, Salesperson, PotentialCustomer, AutomobileVO

@admin.register(Sales)
class SalesAdmin(admin.ModelAdmin):
    pass


@admin.register(Salesperson)
class SalespersonAdmin(admin.ModelAdmin):
    pass


@admin.register(PotentialCustomer)
class PotentialCustomerAdmin(admin.ModelAdmin):
    pass

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass
# Register your models here.
