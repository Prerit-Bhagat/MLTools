from django.db import models

class UploadedFile(models.Model):
    PROBLEM_TYPE_CHOICES = [
        ('regression', 'Regression'),
        ('classification', 'Classification'),
    ]

    title = models.CharField(max_length=50)
    file = models.FileField(upload_to="uploads/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    target_variable = models.CharField(max_length=100,default="unknown") 
    weights = models.JSONField(default=dict)
    impact = models.JSONField(default=dict)

# api/models.py
from django.db import models

# Create your models here.


class Token(models.Model):
    id = models.AutoField(primary_key=True)
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField()
    expires_at = models.DateTimeField()
    user_id = models.IntegerField()
    is_used = models.BooleanField(default=False)


class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    phone = models.CharField(max_length=10, null=True)
    country = models.CharField(max_length=63)

    def __str__(self) -> str:
        return self.name