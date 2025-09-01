from rest_framework import serializers
from .models import *


class MachineLearningSerializer(serializers.ModelSerializer):
    class Meta:
        model=UploadedFile
        fields='__all__'

class StudentSerializer(serializers.Serializer):
    name = serializers.CharField()
    age = serializers.IntegerField()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["name", "email", "password", "country", "phone"]


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ["token", "created_at", "expires_at", "user_id", "is_used"]