# Generated by Django 4.0.3 on 2023-01-27 00:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0011_autosvo_vip'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='vin',
            field=models.CharField(max_length=17, unique=True),
        ),
    ]
