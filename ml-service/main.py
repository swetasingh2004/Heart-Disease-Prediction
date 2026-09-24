from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib


# =====================================================
# CREATE FASTAPI APPLICATION
# =====================================================

app = FastAPI(title="Heart Disease ML API")


# =====================================================
# CORS CONFIGURATION
# =====================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================================
# LOAD TRAINED ML FILES
# =====================================================

model = joblib.load("LogisticRegression_heart.pkl")
scaler = joblib.load("scaler.pkl")
expected_columns = joblib.load("columns.pkl")


# =====================================================
# INPUT DATA STRUCTURE
# =====================================================

class PatientData(BaseModel):

    age: int
    sex: str
    chest_pain: str
    resting_bp: int
    cholesterol: int
    fasting_bs: int
    resting_ecg: str
    max_hr: int
    exercise_angina: str
    oldpeak: float
    st_slope: str


# =====================================================
# HOME ENDPOINT
# =====================================================

@app.get("/")
def home():

    return {
        "message": "Heart Disease ML API is running"
    }


# =====================================================
# PREDICTION ENDPOINT
# =====================================================

@app.post("/predict")
def predict(data: PatientData):

    # -------------------------------------------------
    # CREATE RAW INPUT
    # -------------------------------------------------

    raw_input = {

        "Age": data.age,

        "Sex" + data.sex: 1,

        "ChestPainType_" + data.chest_pain: 1,

        "RestingBP": data.resting_bp,

        "Cholesterol": data.cholesterol,

        "FastingBS": data.fasting_bs,

        "RestingECG" + data.resting_ecg: 1,

        "MaxHR": data.max_hr,

        "ExerciseAngina" + data.exercise_angina: 1,

        "Oldpeak": data.oldpeak,

        "ST_Slope" + data.st_slope: 1
    }


    # -------------------------------------------------
    # CONVERT INPUT TO DATAFRAME
    # -------------------------------------------------

    input_df = pd.DataFrame([raw_input])


    # -------------------------------------------------
    # ADD MISSING COLUMNS
    # -------------------------------------------------

    for col in expected_columns:

        if col not in input_df.columns:

            input_df[col] = 0


    # -------------------------------------------------
    # ARRANGE COLUMNS
    # EXACTLY LIKE TRAINING DATA
    # -------------------------------------------------

    input_df = input_df[expected_columns]


    # -------------------------------------------------
    # SCALE INPUT
    # -------------------------------------------------

    scaled_input = scaler.transform(input_df)


    # -------------------------------------------------
    # MAKE PREDICTION
    # -------------------------------------------------

    prediction = model.predict(scaled_input)[0]


    # -------------------------------------------------
    # GET PROBABILITY OF CLASS 1
    # -------------------------------------------------

    class_1_index = list(model.classes_).index(1)

    probability = model.predict_proba(
        scaled_input
    )[0][class_1_index]


    # -------------------------------------------------
    # CREATE READABLE RESULT
    # -------------------------------------------------

    if prediction == 1:

        result = "Higher likelihood of heart disease"

    else:

        result = "Lower likelihood of heart disease"


    # -------------------------------------------------
    # RETURN RESPONSE TO FRONTEND
    # -------------------------------------------------

    return {

        "prediction": int(prediction),

        "result": result,

        "probability": round(
            float(probability) * 100,
            2
        )
    }