# Generated by Django 5.1.4 on 2024-12-17 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0004_alter_bookingride_chat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookingride',
            name='chat',
            field=models.TextField(default=[]),
        ),
    ]
