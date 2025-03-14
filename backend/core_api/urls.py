from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import BeamViewSet, LoadViewSet,ColumnViewSet, beam_to_column_calculation

router = DefaultRouter()
router.register(r'beams', BeamViewSet)
router.register(r'columns', ColumnViewSet)
router.register(r'loads', LoadViewSet)

urlpatterns = [
    path('beams/', BeamViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('loads/', LoadViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('columns/', ColumnViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('calculate/', beam_to_column_calculation, name='calculate_beam'),
   
]
