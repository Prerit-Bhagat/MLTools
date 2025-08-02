# views.py

import os
import pandas as pd
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from pycaret.classification import setup as cls_setup, compare_models as cls_compare, pull as cls_pull
from pycaret.regression import setup as reg_setup, compare_models as reg_compare, pull as reg_pull
from .topsis import topsisfunction


class AutomlTopsisView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        try:
            target_var = request.data.get("target_var")
            problem_type = request.data.get("problem_type", "classification").lower()
            file = request.FILES.get("file")
            weights = list(map(int, request.POST.get("weights", "").split(",")))
            impacts = request.POST.get("impacts", "").split(",")

            if not target_var or not file:
                return Response({"error": "Missing target_var or file."}, status=400)
            if problem_type not in ["classification", "regression"]:
                return Response({"error": "Invalid problem_type."}, status=400)

            upload_dir = os.path.join(settings.MEDIA_ROOT, "uploads")
            os.makedirs(upload_dir, exist_ok=True)
            file_path = os.path.join(upload_dir, file.name)
            with open(file_path, "wb+") as dest:
                for chunk in file.chunks():
                    dest.write(chunk)

            df = pd.read_csv(file_path)
            if target_var not in df.columns:
                return Response({"error": f"Target variable '{target_var}' not found."}, status=400)

            # Handle missing values
            for col in df.columns:
                if df[col].dtype == "object":
                    df[col].fillna(df[col].mode()[0], inplace=True)
                else:
                    df[col].fillna(df[col].median(), inplace=True)

            # Setup PyCaret functions
            if problem_type == "classification":
                setup_fn, compare_fn, pull_fn = cls_setup, cls_compare, cls_pull
                feature_count = 8
                include_models = ['lr', 'dt', 'rf', 'knn', 'nb']  # Fast classifiers
            else:
                setup_fn, compare_fn, pull_fn = reg_setup, reg_compare, reg_pull
                feature_count = 7
                include_models = ['lr', 'dt', 'knn', 'ridge', 'lasso']  # Fast regressors

            # Validate weights/impacts
            if len(weights) != feature_count or len(impacts) != feature_count:
                return Response({"error": "weights/impacts length must match number of features."}, status=400)

            # Choose dynamic folds
            folds = max(2, min(5, df.shape[0] - 1))  # Limit to 5 for Render timeout safety

            # PyCaret Setup
            setup_fn(data=df, target=target_var, fold=folds,
                     numeric_imputation="median", categorical_imputation="mode",
                      verbose=False)

            #  Safe compare_models
            best_model = compare_fn(fold=folds, include=include_models, turbo=True)
            model_results = pull_fn()

            if model_results.empty:
                return Response({"error": "No models found during compare_models."}, status=500)

            model_col = next((col for col in model_results.columns if "model" in col.lower()), None)
            if not model_col:
                return Response({"error": "Could not detect model column in results."}, status=500)

            model_results.set_index(model_col, inplace=True)
            print("Before TOPSIS:\n", model_results)

            # Apply TOPSIS
            scores = topsisfunction(model_results, weights, impacts)
            model_results["TOPSIS Score"] = scores
            model_results.sort_values("TOPSIS Score", ascending=False, inplace=True)

            best_name = model_results.index[0]
            best_metrics = model_results.iloc[0].to_dict()
            print("After TOPSIS:\n", model_results)
            
            return Response({
                "message": "Best model found successfully",
                "best_model_name": best_name,
                "metrics": best_metrics,
            }, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=500)

# import os
# import pandas as pd
# from django.conf import settings
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.parsers import MultiPartParser, FormParser
# from pycaret.classification import setup as cls_setup, compare_models as cls_compare, pull as cls_pull
# from pycaret.regression import setup as reg_setup, compare_models as reg_compare, pull as reg_pull
# from .topsis import *
# import json


# class AutomlTopsisView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request, *args, **kwargs):
#         try:
#             # Extract input parameters
#             target_var = request.data.get("target_var")
#             problem_type = request.data.get("problem_type", "classification").lower()
#             file = request.FILES.get("file")
#             # Ensure weights and impacts are properly parsed
#             weights = list(map(int, request.POST.get("weights", "").split(",")))  # Convert from JSON string to list
#             impacts = request.POST.get("impacts", "").split(",")  # Convert from JSON string to list

#            # Debugging: Print the extracted values
#             print("Target Variable:", target_var)
#             print("Problem Type:", problem_type)
#             print("Weights:", weights)
#             print("Impacts:", impacts)

            

#             # return Response({"HJe":"dsd"})
#             # Validate inputs
#             if not target_var or not file:
#                 return Response({"error": "Missing required fields: target_var, file"}, status=400)

#             if problem_type not in ["classification", "regression"]:
#                 return Response({"error": "Invalid problem type. Choose 'classification' or 'regression'."}, status=400)

            
            
#             # Save the uploaded file
#             upload_dir = os.path.join(settings.MEDIA_ROOT, "uploads")
#             os.makedirs(upload_dir, exist_ok=True)
#             file_path = os.path.join(upload_dir, file.name)

#             with open(file_path, "wb+") as dest:
#                 for chunk in file.chunks():
#                     dest.write(chunk)

#             # Read CSV
#             df = pd.read_csv(file_path)
#             if target_var not in df.columns:
#                 return Response({"error": f"Target variable '{target_var}' not found in CSV"}, status=400)

#             catcol=['object']
#             # if(np.unique(df.dtypes)>3):
#                 # problem_type = "regression"
#             # else:
#                 # problem_type = "classification"

#             if(problem_type == "classification"):
#                 columns = 8
#             if(problem_type == "regression"):
#                 columns = 7
                
#             if(len(weights)<columns or len(impacts)<columns):
#                 return Response({"error": "Length Not Match"}, status=400)
            

#             for i in df.columns:
#                 if i in catcol:
#                     df[i].fillna(df[i].mode()[0],inplace=True)
#                 else:
#                     df[i].fillna(df[i].median(),inplace=True)

#             # PyCaret AutoML
#             if problem_type == "classification":
#                 cls_setup(data=df, target=target_var,numeric_imputation="median", categorical_imputation="mode", verbose=False)
#                 best_model = cls_compare()
#                 model_results = cls_pull()
#             else:
#                 reg_setup(data=df, target=target_var,numeric_imputation="median", categorical_imputation="mode", verbose=False)
#                 best_model = reg_compare()
#                 model_results = reg_pull()
   
#             # Extract best model details
#             # model_info = model_results.iloc[0].to_dict()
            

#             data = model_results.copy()
#             data.set_index("Model", inplace=True)
            
#             print("Before TOPSIS:\n", data)
            
#             topsis_scores = topsisfunction(data, weights, impacts)
#             data["TOPSIS Score"] = topsis_scores
#             data = data.sort_values(by="TOPSIS Score", ascending=False)  # Sort best models
            
#             print("After TOPSIS:\n", data)

#             # Extract best model details
#             best_model_name = data.index[0]
#             best_model_metrics = data.iloc[0].to_dict()

#             print("Best Model:", best_model_name)
#             print("Best Model Metrics:", best_model_metrics)

#             return Response({
#                 "message": "Best model found successfully",
#                 "best_model_name": best_model_name,
#                 "metrics": best_model_metrics, 
#             }, status=200)

#         except Exception as e:
#             return Response({"error": str(e)}, status=500)

