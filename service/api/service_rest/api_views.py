from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Service, AutosVO, Technician 

class AutosVODetailEncoder(ModelEncoder):
    model = AutosVO
    properties = ["vin", "import_href"]

class ServiceListEncoder(ModelEncoder):
    model = Service
    properties = ["customer_name", "date", "time", "reason", "completed", "technician_name"]

    def get_extra_data(self, o):
        return {"vin": o.vin}

class ServiceDetailEncoder(ModelEncoder):
    model = Service
    properties = [
        "customer_name",
        "date",
        "time",
        "reason",
        "completed",
        "technician_name",
    ]
    encoders = {
        "vin": AutosVODetailEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_services(request):
    if request.method == "GET":
        services = Service.objects.all()
        return JsonResponse(
            {"services": services},
            encoder=ServiceListEncoder,
        )
    else:
        content = json.loads(request.body)
  
        try:

            vin = AutosVO.objects.get(id=content["vin"])
            content["vin"] = vin
        except AutosVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile vin"},
                status=400,
            )

        service = Service.objects.create(**content)
        return JsonResponse(
            service,
            encoder=ServiceDetailEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET"])
def api_show_service(request, pk):
    if request.method == "GET":
        service = Service.objects.get(id=pk)
        return JsonResponse(
            service,
            encoder=ServiceDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Service.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(["GET"])
def api_show_history(request, vin):
    if request.method == "GET":
        service = Service.objects.get(id=vin)
        return JsonResponse(
            service,
            encoder=ServiceDetailEncoder,
            safe=False,
        )

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["technician_name", "emloyee_number", "id"]

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = ["technician_name", "employee_number", "id"]


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse({"technicians": technicians}, encoder=TechnicianListEncoder)
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET"])
def api_list_autosVOs(request):
    autos = AutosVO.objects.all()
    return JsonResponse({"autos": autos}, encoder=AutosVODetailEncoder) 