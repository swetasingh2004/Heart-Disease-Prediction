import streamlit as st
import pandas as pd
import joblib

# --------------------------------------------------
# PAGE CONFIGURATION
# --------------------------------------------------

st.set_page_config(
    page_title="Heart Disease Predictor",
    page_icon="❤️",
    layout="centered"
)

# --------------------------------------------------
# LOAD MODEL
# --------------------------------------------------

model = joblib.load("LogisticRegression_heart.pkl")
scaler = joblib.load("scaler.pkl")
expected_columns = joblib.load("columns.pkl")

# --------------------------------------------------
# HEADER
# --------------------------------------------------

st.title("❤️ Heart Disease Risk Predictor")

st.markdown(
    """
    Enter the patient's health information below to generate
    a machine-learning based prediction.
    """
)

st.info(
    "⚠️ This application is for educational purposes only and "
    "is not a medical diagnosis."
)

# --------------------------------------------------
# PATIENT INFORMATION
# --------------------------------------------------

st.subheader("👤 Patient Information")

col1, col2 = st.columns(2)

with col1:
    age = st.slider(
        "Age",
        min_value=18,
        max_value=100,
        value=40
    )

with col2:
    sex = st.selectbox(
        "Sex",
        ["M", "F"]
    )

# --------------------------------------------------
# HEART / CLINICAL INFORMATION
# --------------------------------------------------

st.subheader("❤️ Clinical Information")

col1, col2 = st.columns(2)

with col1:
    chest_pain = st.selectbox(
        "Chest Pain Type",
        ["ATA", "NAP", "TA", "ASY"]
    )

    resting_bp = st.number_input(
        "Resting Blood Pressure (mm Hg)",
        min_value=80,
        max_value=200,
        value=120
    )

    cholesterol = st.number_input(
        "Cholesterol (mg/dL)",
        min_value=100,
        max_value=600,
        value=200
    )

    fasting_bs = st.selectbox(
        "Fasting Blood Sugar > 120 mg/dL",
        [0, 1]
    )

with col2:
    resting_ecg = st.selectbox(
        "Resting ECG",
        ["Normal", "ST", "LVH"]
    )

    max_hr = st.slider(
        "Maximum Heart Rate",
        min_value=60,
        max_value=220,
        value=150
    )

    exercise_angina = st.selectbox(
        "Exercise-Induced Angina",
        ["Y", "N"]
    )

    oldpeak = st.number_input(
        "Oldpeak (ST Depression)",
        min_value=0.0,
        max_value=6.0,
        value=1.0,
        step=0.1
    )

st_slope = st.selectbox(
    "ST Slope",
    ["Up", "Flat", "Down"]
)

# --------------------------------------------------
# PREDICTION
# --------------------------------------------------

st.divider()

predict_button = st.button(
    "🔍 Predict Heart Disease Risk",
    use_container_width=True
)

if predict_button:

    # Create input using the same encoded-column structure
    # used during model training.

    raw_input = {
        "Age": age,
        "Sex" + sex: 1,
        "ChestPainType_" + chest_pain: 1,
        "RestingBP": resting_bp,
        "Cholesterol": cholesterol,
        "FastingBS": fasting_bs,
        "RestingECG" + resting_ecg: 1,
        "MaxHR": max_hr,
        "ExerciseAngina" + exercise_angina: 1,
        "Oldpeak": oldpeak,
        "ST_Slope" + st_slope: 1
    }

    input_df = pd.DataFrame([raw_input])

    # Make sure the input has exactly the same
    # columns as the training data.

    for col in expected_columns:
        if col not in input_df.columns:
            input_df[col] = 0

    input_df = input_df[expected_columns]

    # Scale input using the saved scaler
    scaled_input = scaler.transform(input_df)

    # Make prediction
    prediction = model.predict(scaled_input)[0]

    # --------------------------------------------------
    # RESULT
    # --------------------------------------------------

    st.divider()
    st.subheader("📊 Prediction Result")

    if prediction == 1:

        st.error(
            "⚠️ Higher likelihood of heart disease based on "
            "the model's prediction."
        )

        st.warning(
            "This result is not a medical diagnosis. "
            "Please consult a qualified healthcare professional."
        )

    else:

        st.success(
            "✅ Lower likelihood of heart disease based on "
            "the model's prediction."
        )

        st.info(
            "This result does not rule out heart disease. "
            "Consult a healthcare professional for medical advice."
        )

# --------------------------------------------------
# ABOUT THE PROJECT
# --------------------------------------------------

with st.expander("ℹ️ About this project"):

    st.write(
        """
        This project uses Machine Learning to predict the likelihood
        of heart disease based on selected patient health parameters.

        The final model used in this application is Logistic Regression.

        The application was developed using:

        • Python
        • Pandas
        • Scikit-learn
        • Joblib
        • Streamlit
        """
    )