# Generated by Django 4.1.1 on 2024-04-18 19:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("webstore", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="webstore",
            name="webstore_name",
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name="webstorerating",
            name="webstore",
            field=models.CharField(max_length=150),
        ),
    ]