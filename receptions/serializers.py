from rest_framework import serializers
from .models import Dishes

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dishes
        fields = ['id', 'name', 'preview']