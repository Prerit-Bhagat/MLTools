from flask import Flask, request, jsonify, send_file # type: ignore
import pandas as pd
import os
import pickle
from pycaret.classification import setup as cls_setup, compare_models as cls_compare, save_model as cls_save
from pycaret.regression import setup as reg_setup, compare_models as reg_compare, save_model as reg_save

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
MODEL_FOLDER = "models"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(MODEL_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    problem_type = request.form.get('problem_type')
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)
    
    try:
        df = pd.read_csv(filepath)
        target = request.form.get('target_column')
        if target not in df.columns:
            return jsonify({"error": "Invalid target column"}), 400
        
        if problem_type == 'classification':
            setup = cls_setup(df, target=target, silent=True)
            best_model = cls_compare()
            model_path = os.path.join(MODEL_FOLDER, 'best_classification_model')
            cls_save(best_model, model_path)
        elif problem_type == 'regression':
            setup = reg_setup(df, target=target, silent=True)
            best_model = reg_compare()
            model_path = os.path.join(MODEL_FOLDER, 'best_regression_model')
            reg_save(best_model, model_path)
        else:
            return jsonify({"error": "Invalid problem type"}), 400
        
        return jsonify({"message": "Model trained successfully", "model_path": model_path + '.pkl'})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/download', methods=['GET'])
def download_model():
    model_path = request.args.get('model_path')
    if not model_path or not os.path.exists(model_path):
        return jsonify({"error": "File not found"}), 404
    return send_file(model_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)