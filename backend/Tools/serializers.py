from rest_framework import serializers
from .models import *


class MachineLearningSerializer(serializers.ModelSerializer):
    class Meta:
        model=UploadedFile
        fields='__all__'

class StudentSerializer(serializers.Serializer):
    name = serializers.CharField()
    age = serializers.IntegerField()