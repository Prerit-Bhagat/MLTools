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