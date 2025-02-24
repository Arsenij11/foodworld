from django.contrib import admin

from .models import Dishes, Instruction, Ingredients, Photo

# Register your models here.

admin.site.register(Dishes)
admin.site.register(Instruction)
admin.site.register(Ingredients)
admin.site.register(Photo)