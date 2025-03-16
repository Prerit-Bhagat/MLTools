# AutoML Web App using PyCaret

This project is a web-based application that allows users to upload datasets, specify target variables, and automatically determine the best machine learning model using PyCaret. The backend is built with Django and the frontend with React.

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

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/your-username/MLTools.git
cd MLTools
```

### 2. Setup Backend
```sh
cd backend
python -m venv myenv
source myenv/bin/activate  # On Windows use: myenv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Setup Frontend
```sh
cd Tools
npm i
npm run dev
```

## License
This project is licensed under the MIT License.
