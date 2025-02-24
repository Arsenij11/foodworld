from django.urls import path
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    path('list', views.ListDishesAPIView.as_view(), name='alldishes'),
    path('dish/<int:dish_id>', views.DishAPIView.as_view(), name = 'dish'),
    path('list/category/<slug:cat>', views.ListByCategoryAPIView.as_view(), name ='listbycat'),
    path('rating/<slug:rating>/<int:dish_id>', views.UpdateRatingAPIView.as_view(), name = 'rating'),
    path('openapidocs_foodworld', TemplateView.as_view(
                      template_name='openapi.html',
                      extra_context={'schema_url': 'openapi-schema'}
                  ), name='openapidocs'),
]