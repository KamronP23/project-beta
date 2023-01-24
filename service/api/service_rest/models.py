from django.db import models
from django.urls import reverse

class AutosVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)


class Technician(models.Model):
    technician_name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.name

class Service(models.Model):
    customer_name = models.CharField(max_length=200)
    date = models.DateTimeField()
    time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    completed = models.BooleanField(null=False)

    technician = models.ForeignKey(
    Technician,
    related_name="tech",
    on_delete=models.CASCADE
    )

    vin = models.ForeignKey(
    AutosVO,
    related_name="autos",
    on_delete=models.CASCADE
    )

    def get_api_url(self):
        return reverse("api_service", kwargs={"vin": self.vin})

    def __str__(self):
        return self.name