# Generated by Django 5.1.6 on 2025-02-20 18:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('receptions', '0004_alter_dishes_prepare_time'),
    ]

    operations = [
        migrations.RenameField(
            model_name='dishes',
            old_name='add_data',
            new_name='add_date',
        ),
    ]
