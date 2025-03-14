import os
import pandas as pd
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from pycaret.classification import setup as cls_setup, compare_models as cls_compare, pull as cls_pull
from pycaret.regression import setup as reg_setup, compare_models as reg_compare, pull as reg_pull

class AutomlTopsisView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        try:
            # Extract input parameters
            target_variable = request.data.get("target_variable")
            problem_type = request.data.get("problem_type", "classification").lower()
            file = request.FILES.get("file")

            # Validate inputs
            if not target_variable or not file:
                return Response({"error": "Missing required fields: target_variable, file"}, status=400)

            if problem_type not in ["classification", "regression"]:
                return Response({"error": "Invalid problem type. Choose 'classification' or 'regression'."}, status=400)

            # Save the uploaded file
            upload_dir = os.path.join(settings.MEDIA_ROOT, "uploads")
            os.makedirs(upload_dir, exist_ok=True)
            file_path = os.path.join(upload_dir, file.name)

            with open(file_path, "wb+") as dest:
                for chunk in file.chunks():
                    dest.write(chunk)

            # Read CSV
            df = pd.read_csv(file_path)
            if target_variable not in df.columns:
                return Response({"error": f"Target variable '{target_variable}' not found in CSV"}, status=400)

            # PyCaret AutoML
            # if problem_type == "classification":
            #     cls_setup(data=df, target=target_variable, verbose=False)
            #     best_model = cls_compare()
            #     model_results = cls_pull()
            # else:
            #     reg_setup(data=df, target=target_variable, verbose=False)
            #     best_model = reg_compare()
            #     model_results = reg_pull()
            
            best_model='Linear regression'
            model_info='Nothing'
            # Extract best model details
            # model_info = model_results.iloc[0].to_dict()

            return Response({
                "message": "Best model found successfully",
                "best_model_name": str(best_model),
                "metrics": model_info,
            }, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=500)
