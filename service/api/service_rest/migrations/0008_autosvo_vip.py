# Generated by Django 4.0.3 on 2023-01-26 19:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0007_remove_service_date_remove_service_time_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='autosvo',
            name='vip',
            field=models.BooleanField(default=True),
        ),
    ]
