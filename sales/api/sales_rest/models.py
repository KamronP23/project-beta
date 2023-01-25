from django.db import models
from django.urls import reverse

# Create your models here.
class Salesperson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}"


class PotentialCustomer(models.Model):
    name = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=10)
    state = models.CharField(max_length=100)
    phone = models.CharField(max_length=12)

    def __str__(self):
        return f"{self.name}"

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.import_href}"


class Sales(models.Model):
    sale_price = models.PositiveBigIntegerField()

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE
    )

    customer = models.ForeignKey(
        PotentialCustomer,
        related_name = "sales",
        on_delete=models.CASCADE
    )

    salesperson = models.ForeignKey(
        Salesperson,
        related_name = "sales",
        on_delete=models.CASCADE
    )

    def get_api_url(self):
        return reverse("api_show_sales", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.salesperson} {self.customer} {self.automobile}"