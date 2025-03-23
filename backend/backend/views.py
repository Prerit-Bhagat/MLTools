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
            target_variable = request.data.get("target_variable")
            problem_type = request.data.get("problem_type", "classification").lower()
            file = request.FILES.get("file")
            # Ensure weights and impacts are properly parsed
            weights = list(map(int, request.POST.get("weights", "").split(",")))  # Convert from JSON string to list
            # impacts = request.POST.get("impacts", "").split(",")  # Convert from JSON string to list

           # Debugging: Print the extracted values
            # print("Target Variable:", target_variable)
            # print("Problem Type:", problem_type)
            # print("Weights:", weights)
            # print("Impacts:", impacts)

            

            # return Response({"HJe":"dsd"})
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

            catcol=['object']

            # if(len(weights)>6 ):
            #     return Response({"error": "Length Not Match"}, status=400)
        

            for i in df.columns:
                if i in catcol:
                    df[i].fillna(df[i].mode()[0],inplace=True)
                else:
                    df[i].fillna(df[i].median(),inplace=True)

            # PyCaret AutoML
            if problem_type == "classification":
                cls_setup(data=df, target=target_variable,numeric_imputation="median", categorical_imputation="mode", verbose=False)
                best_model = cls_compare()
                model_results = cls_pull()
            else:
                reg_setup(data=df, target=target_variable,numeric_imputation="median", categorical_imputation="mode", verbose=False)
                best_model = reg_compare()
                model_results = reg_pull()
   
            # Extract best model details
            # model_info = model_results.iloc[0].to_dict()
            

            data = model_results.copy()
            data.set_index("Model", inplace=True)
            num_columns = data.shape[1]

            if len(weights) > num_columns:
                weights = weights[:num_columns]  # Trim extra weights
            else:
                weights = weights + [0] * (num_columns - len(weights))  # Pad with zeros

            # Convert to numpy array if needed
            weights = np.array(weights)

            if problem_type == 'classification':
                impacts = ['+', '+', '+', '+', '+', '+','+','-']  # [Accuracy     AUC  Recall   Prec.      F1   Kappa     MCC  TT (Sec)]
            else:
                impacts = ['-', '-', '-', '+', '-', '-']  #  [MAE     MSE    RMSE      R2   RMSLE    MAPE  TT (Sec)]

            print("Before TOPSIS:\n", data)
            
            topsis_scores = topsisfunction(data, weights, impacts)
            data["TOPSIS Score"] = topsis_scores
            data = data.sort_values(by="TOPSIS Score", ascending=False)  # Sort best models
            
            print("After TOPSIS:\n", data)

            # Extract best model details
            best_model_name = data.index[0]
            best_model_metrics = data.iloc[0].to_dict()

            print("Best Model:", best_model_name)
            print("Best Model Metrics:", best_model_metrics)

            return Response({
                "message": "Best model found successfully",
                "best_model_name": best_model_name,
                "metrics": best_model_metrics,  
            }, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=500)