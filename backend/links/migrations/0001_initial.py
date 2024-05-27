# Generated by Django 4.1.1 on 2024-02-03 12:08

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="SearchResult",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("description", models.CharField(max_length=255)),
                ("link", models.URLField()),
                ("timestamp", models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]
