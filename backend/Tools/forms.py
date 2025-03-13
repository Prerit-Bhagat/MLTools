from django import forms
from .models import UploadedFile


class ModelFormWithFileField(forms.ModelForm):
    class Meta:
        model = UploadedFile
        fields = "__all__"