from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Salesperson, PotentialCustomer
import json

# Create your views here.

class SalesPersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "name",
        "employee_number",
        "id"
    ]

class PotentialCustomerListEncoder(ModelEncoder):
    model = PotentialCustomer
    properties = [
        "name",
        "street",
        "city",
        "zip_code",
        "state",
        "phone",
    ]

require_http_methods(["GET", "POST"])
def api_list_salesperson(request):
    if request.method == "GET":
        salespersons = Salesperson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons},
            encoder = SalesPersonListEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            salespersons = Salesperson.objects.create(**content)
            return JsonResponse(
                salespersons,
                encoder=SalesPersonListEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create Salesperson"}
            )
            response.status_code = 400
            return response


require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customer = PotentialCustomer.objects.all()
        return JsonResponse(
            {"customer": customer},
            encoder = PotentialCustomerListEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            customer = PotentialCustomer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=PotentialCustomerListEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create customer"}
            )
            response.status_code = 400
            return response