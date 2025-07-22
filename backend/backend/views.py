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
from .topsis import *
import json


class AutomlTopsisView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        try:
            # Extract input parameters
            target_var = request.data.get("target_var")
            problem = request.data.get("problem", "classification").lower()
            file = request.FILES.get("file")
            # Ensure weights and impacts are properly parsed
            weights = list(map(int, request.POST.get("weights", "").split(",")))  # Convert from JSON string to list
            impacts = request.POST.get("impacts", "").split(",")  # Convert from JSON string to list

           # Debugging: Print the extracted values
            print("Target Variable:", target_var)
            print("Problem Type:", problem)
            print("Weights:", weights)
            print("Impacts:", impacts)

            

            # return Response({"HJe":"dsd"})
            # Validate inputs
            if not target_var or not file:
                return Response({"error": "Missing required fields: target_var, file"}, status=400)

            if problem not in ["classification", "regression"]:
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
            if target_var not in df.columns:
                return Response({"error": f"Target variable '{target_var}' not found in CSV"}, status=400)

            catcol=['object']
            rows, columns = df.shape
            if(len(weights)!=columns-1 or len(impacts)!=columns-1):
                return Response({"error": "Length Not Match"}, status=400)
            

            for i in df.columns:
                if i in catcol:
                    df[i].fillna(df[i].mode()[0],inplace=True)
                else:
                    df[i].fillna(df[i].median(),inplace=True)
            if problem == "classification":
                print("▶ Running Classification Setup")
                setup_fn, compare_fn, pull_fn = cls_setup, cls_compare, cls_pull
            else:
                print("▶ Running Regression Setup")
                setup_fn, compare_fn, pull_fn = reg_setup, reg_compare, reg_pull

            # 6) Run AutoML
            setup_fn(data=df, target=target_var, numeric_imputation="median",
                     categorical_imputation="mode", verbose=False)
            best_model   = compare_fn()
            model_table  = pull_fn()
            if model_table.empty:
                return Response({"error": "No models found. Check your data."}, status=500)

            print("▶ Models:\n", model_table)

            # 7) Dynamically detect the column holding model names
            model_col = None
            for c in model_table.columns:
                if "model" in c.lower():
                    model_col = c
                    break

            if not model_col:
                return Response({"error": "Could not detect 'Model' column."}, status=500)

            # 8) Use that column as the index — only once
            model_table.set_index(model_col, inplace=True)

            # 9) Apply TOPSIS
            scores = topsisfunction(model_table, weights, impacts)
            model_table["TOPSIS Score"] = scores
            model_table.sort_values("TOPSIS Score", ascending=False, inplace=True)

            # 10) Return best
            best_name    = model_table.index[0]
            best_metrics = model_table.iloc[0].to_dict()

            return Response({
                "message":          "Success",
                "best_model_name":  best_name,
                "metrics":          best_metrics
            }, status=200)

        except Exception as e:
            # catch any other unexpected crash
            return Response({"error": str(e)}, status=500)

        #     # PyCaret AutoML
        #     if problem == "classification":
        #         cls_setup(data=df, target=target_var,numeric_imputation="median", categorical_imputation="mode", verbose=False)
        #         best_model = cls_compare()
        #         model_results = cls_pull()
        #         if(model_results.empty):
        #             print("Model Results are empty")
        #         else:
        #             print("Model Results:\n", model_results)
        #     else:
        #         print("Running Regression Setup")
        #         # For regression, use reg_setup and reg_compare
        #         reg_setup(data=df, target=target_var,numeric_imputation="median", categorical_imputation="mode", verbose=False)
        #         best_model = reg_compare()
        #         model_results = reg_pull()
        #         if(model_results.empty):
        #             print("Model Results are empty")
        #         else:
        #             print("Model Results:\n", model_results)

        #     if model_results.empty:
        #         return Response({"error": "AutoML results are empty. Check data or target variable."}, status=500)
        #     # Extract best model details
        #     # Step 5: Find the model name column (no next() used)
        #     model_col = None
        #     for col in model_results.columns:
        #         if "model" in col.lower():
        #             model_col = col
        #             break

        #     if model_col is None:
        #         return Response({"error": "Model column not found in result table."}, status=500)

        #     model_results.set_index(model_col, inplace=True)

        #     # model_info = model_results.iloc[0].to_dict()
        #     # print("Best Model Info:", model_info)

        #     data = model_results.copy()
        #     data.set_index("Model", inplace=True)
            
        #     print("Before TOPSIS:\n", data)
            
        #     topsis_scores = topsisfunction(data, weights, impacts)
        #     data["TOPSIS Score"] = topsis_scores
        #     data = data.sort_values(by="TOPSIS Score", ascending=False)  # Sort best models
            
        #     print("After TOPSIS:\n", data)

        #     # Extract best model details
        #     best_model_name = data.index[0]
        #     best_model_metrics = data.iloc[0].to_dict()

        #     print("Best Model:", best_model_name)
        #     print("Best Model Metrics:", best_model_metrics)

        #     return Response({
        #         "message": "Best model found successfully",
        #         "best_model_name": best_model_name,
        #         "metrics": best_model_metrics, 
        #     }, status=200)

        # except Exception as e:
        #     return Response({"error": str(e)}, status=500)