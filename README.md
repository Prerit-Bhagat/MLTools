# AutoML Web App using PyCaret

This project is a web-based application that allows users to upload datasets, specify target variables, and automatically determine the best machine learning model using PyCaret. The backend is built with Django and the frontend with React.

![Vite React - Google Chrome 2025-03-17 01-18-57](https://github.com/user-attachments/assets/bcd507e4-7668-4634-bde8-39cd71c3a967)
![Vite React - Google Chrome 2025-03-17 01-18-57 (1)](https://github.com/user-attachments/assets/9e1cc35e-aeed-4c70-832c-02975b2ba452)

## Features

- Upload CSV datasets
- Choose problem type: Classification or Regression
- AutoML model selection using PyCaret
- Best model details returned to frontend
- User-friendly interface

## Tech Stack

### Backend

- Django
- Django REST Framework (DRF)
- PyCaret
- Pandas & NumPy

### Frontend

- React (with Axios for API calls)
- Tailwind CSS (for styling)
- Normal CSS (for styling)

### How to use

Required for classification:Accuracy | AUC | Recall | Precision | F1 | Kappa | MCC | TT(Training Time) 
Weights: 8 integer values (comma-separated)
Impacts: 8 values of + or - (comma-separated)

Required for regression:MAE | MSE | RMSE | R2 | RMSLE | MAPE | TT(Training Time) 
Weights: 7 integer values (comma-separated)
Impacts: 7 values of + or - (comma-separated)

<!-- https://prerit-bhagat.github.io/MLTools/ -->
