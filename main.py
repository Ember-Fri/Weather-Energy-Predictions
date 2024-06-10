import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from csvgen import *
import joblib
# load the model
model = joblib.load('model_final_please.joblib')
# make predictions on new data
new_data = pd.read_csv('random_data.csv')
predictions = model.predict(new_data)

# store predictions in csv file
predictions_df = pd.DataFrame(predictions, columns=['predictions'])
predictions_df.to_csv('predictions.csv', index=False)