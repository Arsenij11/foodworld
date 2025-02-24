from django.db import models

# Create your models here.



class Dishes(models.Model):
    name = models.CharField(max_length=255, unique=True)
    add_date = models.DateTimeField(auto_now_add=True)
    prepare_time = models.IntegerField()
    like = models.IntegerField(default=0)
    dislike = models.IntegerField(default=0)
    calorijnost = models.IntegerField(default=0)
    belki = models.IntegerField(default=0)
    zhiry = models.IntegerField(default=0)
    uglevody = models.IntegerField(default=0)
    preview = models.ImageField(upload_to='photo/preview/', default='photo/preview/2236228.png')
    category = models.CharField(max_length=100, choices=[
        ('Desert', 'Десерт'),
        ('Meat_dish', 'Мясные блюда'),
        ('Snacks', 'Закуски'),
        ('Soups', 'Супы'),
        ('Salads', 'Салаты')
    ], default='Snack')

    def __str__(self):
        return self.name

class Ingredients(models.Model):
    name = models.CharField(max_length=255)
    count = models.CharField(max_length=100)
    dish = models.ForeignKey(Dishes, on_delete=models.CASCADE, related_name='ingredients')

    def __str__(self):
        return self.name

class Photo(models.Model):
    image = models.ImageField(upload_to='photo/dishes')
    dish = models.ForeignKey(Dishes, on_delete=models.CASCADE, related_name='photo')

    def __str__(self):
        return f'Добавлено фото {self.image.url} блюда {self.dish.name}'

class Instruction(models.Model):
    dish = models.ForeignKey(Dishes, on_delete=models.CASCADE, related_name='instruction')
    number = models.IntegerField()
    text = models.TextField()

    def __str__(self):
        return f'Добавлена инструкция под номером {self.number} {self.text} для блюда {self.dish.name}'