# Generated by Django 4.0.3 on 2023-01-26 23:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0010_remove_autosvo_vip'),
    ]

    operations = [
        migrations.AddField(
            model_name='autosvo',
            name='vip',
            field=models.BooleanField(default=True),
        ),
    ]
