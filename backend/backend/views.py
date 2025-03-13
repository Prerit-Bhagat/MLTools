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

@method_decorator(csrf_exempt, name='dispatch')
class AutomlTopsisView(View):
    def topsis(self, df, weights_list, impacts_list):
        """
        Applies TOPSIS on a decision matrix (df) with given weights and impacts.
        df: DataFrame containing candidate model performance metrics (only the columns used for TOPSIS).
        weights_list: List of weights for each metric.
        impacts_list: List of impacts ('+' means maximize, '-' means minimize) for each metric.
        Returns a numpy array with TOPSIS scores.
        """
        X = df.values.astype(float)
        # Normalize each column (vector normalization)
        norm = np.sqrt((X ** 2).sum(axis=0))
        X_norm = X / norm
        weighted_X = X_norm * np.array(weights_list)
        # Determine ideal best and worst values for each criterion
        ideal_best = []
        ideal_worst = []
        for j, impact in enumerate(impacts_list):
            if impact == '+':
                ideal_best.append(weighted_X[:, j].max())
                ideal_worst.append(weighted_X[:, j].min())
            else:
                ideal_best.append(weighted_X[:, j].min())
                ideal_worst.append(weighted_X[:, j].max())
        ideal_best = np.array(ideal_best)
        ideal_worst = np.array(ideal_worst)
        # Compute separation measures
        separation_best = np.sqrt(((weighted_X - ideal_best) ** 2).sum(axis=1))
        separation_worst = np.sqrt(((weighted_X - ideal_worst) ** 2).sum(axis=1))
        # Calculate TOPSIS score (relative closeness to ideal solution)
        scores = separation_worst / (separation_best + separation_worst)
        return scores

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

            # Read CSV into a DataFrame
            df = pd.read_csv(file_path)
            if target_variable not in df.columns:
                return JsonResponse({"error": f"Target variable '{target_variable}' not found in CSV"}, status=400)

            # Setup PyCaret based on problem type
            if problem_type == "classification":
                cls_setup(data=df, target=target_variable, silent=True, verbose=False)
                cls_compare()
                results = cls_pull()
            elif problem_type == "regression":
                reg_setup(data=df, target=target_variable, silent=True, verbose=False)
                reg_compare()
                results = reg_pull()
            else:
                return JsonResponse({"error": "Invalid problem type. Must be 'classification' or 'regression'."}, status=400)
            
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
