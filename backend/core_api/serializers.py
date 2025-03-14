from rest_framework import serializers
from .models import Beam, Load,Column

class BeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beam
        fields = '__all__'

class LoadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Load
        fields = '__all__'

class ColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Column
        fields = '__all__'
