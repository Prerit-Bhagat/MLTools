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