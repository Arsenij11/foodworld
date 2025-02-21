from django.urls import path

from . import views

urlpatterns = [
    path('list', views.ListDishesAPIView.as_view(), name='alldishes'),
    path('dish/<int:dish_id>', views.DishAPIView.as_view(), name = 'dish')
]