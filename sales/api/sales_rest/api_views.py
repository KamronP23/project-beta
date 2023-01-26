from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Salesperson, PotentialCustomer, Sales, AutomobileVO
import json

# Create your views here.

class SalesPersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "name",
        "employee_number",
        "id"
    ]

class AutomobileVOListEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "import_href",
        "sold",
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
        "id"
    ]

class SalesListEncoder(ModelEncoder):
    model = Sales
    properties = [
        "sale_price",
        "automobile",
        "customer",
        "salesperson",
        "id"
    ]
    encoders = {
        "salesperson": SalesPersonListEncoder(),
        "customer": PotentialCustomerListEncoder(),
        "automobile": AutomobileVOListEncoder(),
    }


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


require_http_methods(["GET"])
def api_show_salesperson(request, pk):
    if request.method == "GET":
        salespersons = Salesperson.objects.get(id=pk)
        return JsonResponse(
            salespersons,
            encoder=SalesPersonListEncoder,
            safe=False
        )


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

require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sales.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesListEncoder
        )
    else:
        content = json.loads(request.body)
        try:

            autos = AutomobileVO.objects.get(import_href=content["automobile"])
            if autos.sold == False: 
                autos.sold = True
                autos.save()
                content["automobile"] = autos

                customer = PotentialCustomer.objects.get(name=content["customer"])
                content["customer"] = customer

                salesperson = Salesperson.objects.get(name=content["salesperson"])
                content["salesperson"] = salesperson
                sales = Sales.objects.create(**content)
                return JsonResponse(
                    sales,
                    encoder=SalesListEncoder,
                    safe=False
                )
            else:
                response = JsonResponse(
                    {"message": "Car is already sold"}
                    )
            response.status_code = 400
            return response


        except:
            return JsonResponse(
                {"message": "Could not process sale"},
                status=400,
            )


require_http_methods(["GET"])
def api_sales_details(request, pk):
    if request.method == "GET":
        sales = Sales.objects.filter(id=pk)
        return JsonResponse(
            sales,
            encoder=SalesListEncoder,
            safe=False
        )



require_http_methods(["GET"])
def api_list_automobilesvo(request):
    if request.method == "GET":
        autos = AutomobileVO.objects.all()
        return JsonResponse({"autos": autos}, encoder=AutomobileVOListEncoder)