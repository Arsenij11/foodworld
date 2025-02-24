# Generated by Django 5.1.6 on 2025-02-20 08:39

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('receptions', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dishes',
            name='author',
        ),
        migrations.RemoveField(
            model_name='dishes',
            name='instruction',
        ),
        migrations.AddField(
            model_name='dishes',
            name='add_data',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='dishes',
            name='belki',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='dishes',
            name='calorijnost',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='dishes',
            name='category',
            field=models.CharField(choices=[('Desert', 'Десерт'), ('Meat dish', 'Мясные блюда'), ('Snacks', 'Закуски'), ('Soups', 'Супы'), ('Salads', 'Салаты')], default='Snack', max_length=100),
        ),
        migrations.AddField(
            model_name='dishes',
            name='dislike',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='dishes',
            name='like',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='dishes',
            name='preview',
            field=models.ImageField(default='photo/preview/2236228.png', upload_to='photo/preview/%Y/%m/%d'),
        ),
        migrations.AddField(
            model_name='dishes',
            name='uglevody',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='dishes',
            name='zhiry',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='dishes',
            name='name',
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.CreateModel(
            name='Ingredients',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('count', models.IntegerField()),
                ('dish', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ingredients', to='receptions.dishes')),
            ],
        ),
        migrations.CreateModel(
            name='Instruction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('text', models.TextField()),
                ('dish', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='instruction', to='receptions.dishes')),
            ],
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='photo/%Y/%m/%d')),
                ('dish', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photo', to='receptions.dishes')),
            ],
        ),
        migrations.DeleteModel(
            name='Author',
        ),
    ]
