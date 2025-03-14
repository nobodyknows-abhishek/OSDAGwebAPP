from rest_framework import viewsets
from django.http import JsonResponse
from .models import Beam, Load
from .serializers import BeamSerializer, LoadSerializer, ColumnSerializer
from .models import Beam, Column
from django.http import JsonResponse
from django.shortcuts import get_object_or_404




class BeamViewSet(viewsets.ModelViewSet):
    queryset = Beam.objects.all()
    serializer_class = BeamSerializer

class LoadViewSet(viewsets.ModelViewSet):
    queryset = Load.objects.all()
    serializer_class = LoadSerializer

class ColumnViewSet(viewsets.ModelViewSet):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer

def calculate_beam(request):
    beam_id = request.GET.get('beam_id')
    load_id = request.GET.get('load_id')

    beam = Beam.objects.get(id=beam_id)
    load = Load.objects.get(id=load_id)
    
    deflection = beam.calculate_deflection(load)

    return JsonResponse({'deflection': deflection})
def beam_to_column_calculation(request):
    beam_id = request.GET.get('beam_id')
    column_id = request.GET.get('column_id')

    if not beam_id or not column_id:
        return JsonResponse({'error': 'Beam ID and Column ID are required'}, status=400)

    try:
        beam = Beam.objects.get(id=beam_id)
        column = Column.objects.get(id=column_id)

        # Example Calculation (Replace with actual formulas)
        moment_capacity = beam.length * column.height  # Example Formula
        shear_strength = beam.width * column.width  # Example Formula

        return JsonResponse({
            'beam_id': beam.id,
            'column_id': column.id,
            'moment_capacity': moment_capacity,
            'shear_strength': shear_strength
        })

    except Beam.DoesNotExist:
        return JsonResponse({'error': 'Beam not found'}, status=404)
    except Column.DoesNotExist:
        return JsonResponse({'error': 'Column not found'}, status=404)
