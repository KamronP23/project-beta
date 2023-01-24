from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Salesperson
import json

# Create your views here.

class SalesPersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "name",
        "employee_number",
        "id"
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
