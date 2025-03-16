import numpy as np
import pandas as pd

def topsisfunction(df, weights, impacts):
    """
    Apply the TOPSIS method to rank models.

    Parameters:
    - df: DataFrame (model performance metrics with numerical values)
    - weights: List (weights for each criterion)
    - impacts: List (either '+' for beneficial or '-' for non-beneficial)

    Returns:
    - List of TOPSIS scores for each model
    """

    # Convert to NumPy array for calculations
    data = df.to_numpy().astype(float)

    # Normalize the matrix
    norm_data = data / np.sqrt((data ** 2).sum(axis=0))

    # Apply weights
    weighted_data = norm_data * weights

    # Identify ideal best and worst
    ideal_best = np.where(np.array(impacts) == '+', weighted_data.max(axis=0), weighted_data.min(axis=0))
    ideal_worst = np.where(np.array(impacts) == '+', weighted_data.min(axis=0), weighted_data.max(axis=0))

    # Calculate distances from ideal best and worst
    distance_best = np.sqrt(((weighted_data - ideal_best) ** 2).sum(axis=1))
    distance_worst = np.sqrt(((weighted_data - ideal_worst) ** 2).sum(axis=1))

    # Compute TOPSIS score
    topsis_scores = distance_worst / (distance_best + distance_worst)

    return topsis_scores
