from django.db import models

# Create your models here.
class Salesperson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.CharField(max_length=100)

    def __str__(self):
        return self.name
