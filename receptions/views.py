import json

from django.http import HttpResponse
from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from .models import Dishes
from .serializers import DishSerializer


# Create your views here.

class ListDishesAPIView(generics.ListAPIView):
    queryset = Dishes.objects.all()
    serializer_class = DishSerializer

class DishAPIView(generics.RetrieveAPIView):
    def get_object(self):
        dish = get_object_or_404(Dishes, pk = self.kwargs['dish_id'])
        return dish

    def retrieve(self, request, *args, **kwargs):
        dish = self.get_object()
        info_dish = {
            'id' : dish.id,
            'name' : dish.name,
            'add_date' : str(dish.add_date),
            'like' : dish.like,
            'dislike' : dish.dislike,
            'calorijnost' : dish.calorijnost,
            'belki' : dish.belki,
            'zhiry' : dish.zhiry,
            'uglevody' : dish.uglevody,
            'preview' : dish.preview.url,
            'category' : dish.category,
            'ingredients' : [{'name': d.name, 'count': d.count} for d in dish.ingredients.all()],
            'photo' : [p.image.url for p in dish.photo.all()],
            'instruction' : [{'number' : d.number, 'text' : d.text} for d in dish.instruction.all().order_by('number')]
        }

        return HttpResponse(json.dumps(info_dish, ensure_ascii=False), status = 200)


