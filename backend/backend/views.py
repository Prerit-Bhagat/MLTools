# views.py

import os
import pandas as pd
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

# from pycaret.classification import setup as cls_setup, compare_models as cls_compare, pull as cls_pull
# from pycaret.regression import setup as reg_setup, compare_models as reg_compare, pull as reg_pull
from .topsis import topsisfunction
from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from Tools.models import User, Token
from Tools.serializers import UserSerializer, TokenSerializer
from django.conf import settings
from datetime import datetime, timedelta
import hashlib
import uuid
from django.utils import timezone

SALT = "8b4f6b2cc1868d75ef79e5cfb8779c11b6a374bf0fce05b485581bf4e1e25b96c8c2855015de8449"
URL = "http://localhost:3000"



from django.contrib.auth.hashers import check_password
from rest_framework.views import APIView
from rest_framework.response import Response
from Tools.models import User

class AutomlTopsisView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        return Response({"Hello":"World"})
        # try:
        #     # return Response({"Hello":"World"})
        #     target_var = request.data.get("target_var")
        #     problem_type = request.data.get("problem_type", "classification").lower()
        #     file = request.FILES.get("file")
        #     weights = list(map(int, request.POST.get("weights", "").split(",")))
        #     impacts = request.POST.get("impacts", "").split(",")

        #     if not target_var or not file:
        #         return Response({"error": "Missing target_var or file."}, status=400)
        #     if problem_type not in ["classification", "regression"]:
        #         return Response({"error": "Invalid problem_type."}, status=400)

        #     upload_dir = os.path.join(settings.MEDIA_ROOT, "uploads")
        #     os.makedirs(upload_dir, exist_ok=True)
        #     file_path = os.path.join(upload_dir, file.name)
        #     with open(file_path, "wb+") as dest:
        #         for chunk in file.chunks():
        #             dest.write(chunk)

        #     df = pd.read_csv(file_path)
        #     if target_var not in df.columns:
        #         return Response({"error": f"Target variable '{target_var}' not found."}, status=400)

        #     # Handle missing values
        #     for col in df.columns:
        #         if df[col].dtype == "object":
        #             df[col].fillna(df[col].mode()[0], inplace=True)
        #         else:
        #             df[col].fillna(df[col].median(), inplace=True)

        #     # Setup PyCaret functions
        #     if problem_type == "classification":
        #         setup_fn, compare_fn, pull_fn = cls_setup, cls_compare, cls_pull
        #         feature_count = 8
        #         include_models = ['lr', 'dt', 'rf', 'knn', 'nb']  # Fast classifiers
        #     else:
        #         setup_fn, compare_fn, pull_fn = reg_setup, reg_compare, reg_pull
        #         feature_count = 7
        #         include_models = ['lr', 'dt', 'knn', 'ridge', 'lasso']  # Fast regressors

        #     # Validate weights/impacts
        #     if len(weights) != feature_count or len(impacts) != feature_count:
        #         return Response({"error": "weights/impacts length must match number of features."}, status=400)

        #     # Choose dynamic folds
        #     folds = max(2, min(5, df.shape[0] - 1))  # Limit to 5 for Render timeout safety

        #     # PyCaret Setup
        #     setup_fn(data=df, target=target_var, fold=folds,
        #              numeric_imputation="median", categorical_imputation="mode",
        #               verbose=False)

        #     #  Safe compare_models
        #     best_model = compare_fn(fold=folds, include=include_models, turbo=True)
        #     model_results = pull_fn()

        #     if model_results.empty:
        #         return Response({"error": "No models found during compare_models."}, status=500)

        #     model_col = next((col for col in model_results.columns if "model" in col.lower()), None)
        #     if not model_col:
        #         return Response({"error": "Could not detect model column in results."}, status=500)

        #     model_results.set_index(model_col, inplace=True)
        #     print("Before TOPSIS:\n", model_results)

        #     # Apply TOPSIS
        #     scores = topsisfunction(model_results, weights, impacts)
        #     model_results["TOPSIS Score"] = scores
        #     model_results.sort_values("TOPSIS Score", ascending=False, inplace=True)

        #     best_name = model_results.index[0]
        #     best_metrics = model_results.iloc[0].to_dict()
        #     print("After TOPSIS:\n", model_results)
            
        #     return Response({
        #         "message": "Best model found successfully",
        #         "best_model_name": best_name,
        #         "metrics": best_metrics,
        #     }, status=200)

        # except Exception as e:
        #     return Response({"error": str(e)}, status=500)
        #     # return Response({"error": str(e)}, status=500)



class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"success": False, "message": "User does not exist!"})

        if check_password(password, user.password):
            response = Response({"success": True, "message": "Login successful","name": user.name})
            response.set_cookie(
                key="auth_user",
                value=email,
                httponly=True,
                samesite="Lax",
                secure=False
            )
            print(response.cookies,'\n',user.email,user.password)
            return response
        else:
            return Response({"success": False, "message": "Invalid password"})

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        name = data.get("name")
        email = data.get("email")
        phone= data.get("phone")
        password = data.get("password")

        if User.objects.filter(email=email).exists():
            return Response({"success": False, "message": "Email already exists"})

        user = User(
            name=name,
            email=email,
            phone=phone,
            password=make_password(password)  
        )
        user.save()

        # Auto login after register (set cookie)
        response = Response({"success": True, "message": "User registered successfully"})
        response.set_cookie(
            key="auth_user",
            value=email,
            httponly=True,  # JS cannot access this
            samesite="Lax", 
            secure=False     # change to True in production (HTTPS)
        )
        return response
    
from django.http import JsonResponse

def whoami(request):
    print("Cookies:", request.COOKIES) 
    if request.user.is_authenticated:
        return JsonResponse({"username": request.user.username, "email": request.user.email})
    else:
        print("No authenticated user")
    return JsonResponse({"user": None})




def mail_template(content, button_url, button_text):
    return f"""<!DOCTYPE html>
            <html>
            <body style="text-align: center; font-family: "Verdana", serif; color: #000;">
                <div style="max-width: 600px; margin: 10px; background-color: #fafafa; padding: 25px; border-radius: 20px;">
                <p style="text-align: left;">{content}</p>
                <a href="{button_url}" target="_blank">
                    <button style="background-color: #444394; border: 0; width: 200px; height: 30px; border-radius: 6px; color: #fff;">{button_text}</button>
                </a>
                <p style="text-align: left;">
                    If you are unable to click the above button, copy paste the below URL into your address bar
                </p>
                <a href="{button_url}" target="_blank">
                    <p style="margin: 0px; text-align: left; font-size: 10px; text-decoration: none;">{button_url}</p>
                </a>
                </div>
            </body>
            </html>"""


class ResetPasswordView(APIView):
    def post(self, request, format=None):
        user_id = request.data["id"]
        token = request.data["token"]
        password = request.data["password"]

        token_obj = Token.objects.filter(
            user_id=user_id).order_by("-created_at")[0]
        if token_obj.expires_at < timezone.now():
            return Response(
                {
                    "success": False,
                    "message": "Password Reset Link has expired!",
                },
                status=status.HTTP_200_OK,
            )
        elif token_obj is None or token != token_obj.token or token_obj.is_used:
            return Response(
                {
                    "success": False,
                    "message": "Reset Password link is invalid!",
                },
                status=status.HTTP_200_OK,
            )
        else:
            token_obj.is_used = True
            hashed_password = make_password(password=password, salt=SALT)
            ret_code = User.objects.filter(
                id=user_id).update(password=hashed_password)
            if ret_code:
                token_obj.save()
                return Response(
                    {
                        "success": True,
                        "message": "Your password reset was successfully!",
                    },
                    status=status.HTTP_200_OK,
                )


class ForgotPasswordView(APIView):
    def post(self, request, format=None):
        email = request.data["email"]
        user = User.objects.get(email=email)
        created_at = timezone.now()
        expires_at = timezone.now() + timezone.timedelta(1)
        salt = uuid.uuid4().hex
        token = hashlib.sha512(
            (str(user.id) + user.password + created_at.isoformat() + salt).encode(
                "utf-8"
            )
        ).hexdigest()
        token_obj = {
            "token": token,
            "created_at": created_at,
            "expires_at": expires_at,
            "user_id": user.id,
        }
        serializer = TokenSerializer(data=token_obj)
        if serializer.is_valid():
            serializer.save()
            subject = "Forgot Password Link"
            content = mail_template(
                "We have received a request to reset your password. Please reset your password using the link below.",
                f"{URL}/resetPassword?id={user.id}&token={token}",
                "Reset Password",
            )
            send_mail(
                subject=subject,
                message=content,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                html_message=content,
            )
            return Response(
                {
                    "success": True,
                    "message": "A password reset link has been sent to your email.",
                },
                status=status.HTTP_200_OK,
            )
        else:
            error_msg = ""
            for key in serializer.errors:
                error_msg += serializer.errors[key][0]
            return Response(
                {
                    "success": False,
                    "message": error_msg,
                },
                status=status.HTTP_200_OK,
            )


class RegistrationView(APIView):
    def post(self, request, format=None):
        request.data["password"] = make_password(
            password=request.data["password"], salt=SALT
        )
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"success": True, "message": "You are now registered on our website!"},
                status=status.HTTP_200_OK,
            )
        else:
            error_msg = ""
            for key in serializer.errors:
                error_msg += serializer.errors[key][0]
            return Response(
                {"success": False, "message": error_msg},
                status=status.HTTP_200_OK,
            )






















# class LoginView(APIView):
#     def post(self, request, format=None):
#         email = request.data["email"]
#         password = request.data["password"]
#         hashed_password = make_password(password=password, salt=SALT)
#         try:
#             user = User.objects.get(email=email)
#         except User.DoesNotExist:
#             return Response(
#                 {"success": False, "message": "User does not exist!"},
#                 status=status.HTTP_200_OK
#             )

#         if user is None or user.password != hashed_password:
#             return Response(
        #         {
        #             "success": False,
        #             "message": "Invalid Login Credentials!",
        #         },
        #         status=status.HTTP_200_OK,
        #     )
        # else:
        #     return Response(
        #         {"success": True, "message": "You are now logged in!"},
        #         status=status.HTTP_200_OK,
        #     )

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



# api/views.py