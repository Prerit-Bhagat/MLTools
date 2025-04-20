# mongo_connection.py
from pymongo import MongoClient

# Localhost example
client = MongoClient("mongodb://localhost:27017/")

# Replace with your database name
db = client["automl_db"]

# Access your collection
uploaded_files_collection = db["uploaded_files"]
