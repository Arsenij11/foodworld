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

    # def list(self, request, *args, **kwargs):
    #     dishes = self.get_queryset()
    #     list_of_dishes = [{'id' : d.id, 'name' : d.name, 'preview' : d.preview.url} for d in dishes]
    #
    #     return HttpResponse(json.dumps(list_of_dishes, ensure_ascii=False), status=200)

class DishAPIView(generics.RetrieveAPIView):
    def get_object(self):
        dish = get_object_or_404(Dishes, pk = self.kwargs['dish_id'])
        return dish

    def retrieve(self, request, *args, **kwargs):
        dish = self.get_object()
        info_dish = {
            'id' : dish.id,
            'name' : dish.name,
            'prepare_time' : dish.prepare_time,
            'add_date' : str(dish.add_date),
            'like' : dish.like,
            'dislike' : dish.dislike,
            'calorijnost' : dish.calorijnost,
            'belki' : dish.belki,
            'zhiry' : dish.zhiry,
            'uglevody' : dish.uglevody,
            'preview' : dish.preview.url,
            'category' : dish.category,
            'ingredients' : [{'id' : d.id, 'name': d.name, 'count': d.count} for d in dish.ingredients.all()],
            'photo' : [{'id' : p.id, 'url' : 'http://127.0.0.1:8000' + str(p.image.url)} for p in dish.photo.all()],
            'instruction' : [{'id' : d.id, 'number' : d.number, 'text' : d.text} for d in dish.instruction.all().order_by('number')]
        }

        return HttpResponse(json.dumps(info_dish, ensure_ascii=False), status = 200)


class ListByCategoryAPIView(generics.ListAPIView):
    def get_queryset(self):
        list = Dishes.objects.filter(category = self.kwargs['cat'])
        return list

    def list(self, request, *args, **kwargs):
        list = self.get_queryset()
        list_by_cat = [
            {
                'id' : l.id,
                'name' : l.name,
                'preview' : 'http://127.0.0.1:8000' + str(l.preview.url)
            }
        for l in list] if len(list) != 0 else 'No objects'

        return HttpResponse(json.dumps(list_by_cat, ensure_ascii=False), status=200)


class UpdateRatingAPIView(generics.UpdateAPIView):
    def get_object(self):
        dish = get_object_or_404(Dishes, pk = self.kwargs['dish_id'])
        return dish

    def update(self, request, *args, **kwargs):
        dish = self.get_object()
        if self.kwargs['rating'] == 'like':
            dish.like += 1
        else:
            dish.dislike += 1

        dish.save()

        return HttpResponse(json.dumps({'id' : dish.id, 'name' : dish.name, 'like' : dish.like, 'dislike' : dish.dislike}, ensure_ascii=False))


