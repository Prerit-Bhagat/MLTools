import os
import json
import pandas as pd
import numpy as np
from django.conf import settings
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from pycaret.classification import setup as cls_setup, compare_models as cls_compare, pull as cls_pull
from pycaret.regression import setup as reg_setup, compare_models as reg_compare, pull as reg_pull
from pycaret.classification import setup, compare_models


@method_decorator(csrf_exempt, name='dispatch')
class AutomlTopsisView(View):
    def post(self, request, *args, **kwargs):
        try:
            # Extract POST fields
            target_variable = request.POST.get("target_variable")
            problem_type = request.POST.get("problem_type", "classification").lower()
            weights_json = request.POST.get("weights")  # e.g., '{"Accuracy": 0.5, "AUC": 0.3, "Kappa": 0.2}'
            impacts_json = request.POST.get("impacts")    # e.g., '{"Accuracy": "+", "AUC": "+", "Kappa": "+"}'

            if not target_variable or not weights_json or not impacts_json:
                return JsonResponse({"error": "Missing required fields: target_variable, weights, impacts"}, status=400)
            
            try:
                weights_dict = json.loads(weights_json)
                impacts_dict = json.loads(impacts_json)
            except Exception as e:
                return JsonResponse({"error": "Invalid JSON for weights or impacts"}, status=400)
            
            # Use the order of keys from the weights dictionary
            metrics = list(weights_dict.keys())
            weights_list = [float(weights_dict[m]) for m in metrics]
            impacts_list = [impacts_dict[m] for m in metrics]

            # Process CSV file
            file = request.FILES.get("file")
            if not file:
                return JsonResponse({"error": "CSV file is required"}, status=400)
            
            # Save the file into MEDIA_ROOT/uploads/
            upload_dir = os.path.join(settings.MEDIA_ROOT, "uploads")
            os.makedirs(upload_dir, exist_ok=True)
            file_path = os.path.join(upload_dir, file.name)
            with open(file_path, "wb+") as dest:
                for chunk in file.chunks():
                    dest.write(chunk)


            # data = {
            #     'feature_1': np.random.rand(100),  # Random numerical data
            #     'feature_2': np.random.randint(1, 100, size=100),  # Random integer data
            #     'category': np.random.choice(['A', 'B', 'C'], size=100),  # Random categorical data
            #     'target': np.random.choice([0, 1], size=100)  # Binary target variable for classification
            # }


            # Read CSV into a DataFrame
            df = pd.read_csv(file_path)
            
            if target_variable not in df.columns:
                return JsonResponse({"error": f"Target variable '{target_variable}' not found in CSV"}, status=400)
            
            if problem_type == "classification":
                setup(data=df, target=target_variable, remove_outliers = True,normalize = True, verbose=False)
                best_model = compare_models()
                print(best_model)

            elif problem_type == "regression":
                setup(data=df, target=target_variable, verbose=False)
                best_model = compare_models()
                print(best_model)

            else:
                return JsonResponse({"error": "Invalid problem type. Must be 'classification' or 'regression'."}, status=400)
            
            return JsonResponse({
                "message": "AutoML and TOPSIS ranking completed successfully!",
                "best_model": best_model,
            }, status=200)
            
        
            # Setup PyCaret based on problem type
            


            
            
            # Ensure model names are available
            if "Model" not in results.columns:
                results = results.reset_index().rename(columns={"index": "Model"})
            
            # Check that all required metric columns are present in the results
            missing_metrics = [m for m in metrics if m not in results.columns]
            if missing_metrics:
                return JsonResponse({"error": f"The following metrics are missing in the PyCaret results: {missing_metrics}"}, status=400)
            
            # Create decision matrix from the specified performance metrics
            df_metrics = results[metrics]
            
            # Apply TOPSIS to rank candidate models
            scores = self.topsis(df_metrics, weights_list, impacts_list)
            results["TOPSIS_Score"] = scores
            best_index = results["TOPSIS_Score"].idxmax()
            best_model_name = results.loc[best_index, "Model"]

            # Prepare ranking (sorted by TOPSIS score)
            ranking = results[["Model", "TOPSIS_Score"]].sort_values(by="TOPSIS_Score", ascending=False)
            ranking_list = ranking.to_dict(orient="records")

            return JsonResponse({
                "message": "AutoML and TOPSIS ranking completed successfully!",
                "best_model": best_model_name,
                "ranking": ranking_list
            }, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
