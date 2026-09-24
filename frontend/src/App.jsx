import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    chest_pain: "",
    resting_bp: "",
    cholesterol: "",
    fasting_bs: "",
    resting_ecg: "",
    max_hr: "",
    exercise_angina: "",
    oldpeak: "",
    st_slope: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    const patientData = {
      age: Number(formData.age),
      sex: formData.sex,
      chest_pain: formData.chest_pain,
      resting_bp: Number(formData.resting_bp),
      cholesterol: Number(formData.cholesterol),
      fasting_bs: Number(formData.fasting_bs),
      resting_ecg: formData.resting_ecg,
      max_hr: Number(formData.max_hr),
      exercise_angina: formData.exercise_angina,
      oldpeak: Number(formData.oldpeak),
      st_slope: formData.st_slope
    };

    console.log("Sending to Spring Boot:", patientData);

    try {
      const response = await fetch(
        "http://localhost:8080/api/predictions/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(patientData)
        }
      );

      if (!response.ok) {
        throw new Error(
          `API request failed with status ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Spring Boot Response:", data);

      setResult(data);
    } catch (error) {
      console.error("Backend connection error:", error);

      setError(
        "Unable to connect to the AI prediction service. Please make sure Spring Boot and FastAPI are running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNewAssessment = () => {
    setResult(null);
    setError("");

    setFormData({
      age: "",
      sex: "",
      chest_pain: "",
      resting_bp: "",
      cholesterol: "",
      fasting_bs: "",
      resting_ecg: "",
      max_hr: "",
      exercise_angina: "",
      oldpeak: "",
      st_slope: ""
    });

    const assessment = document.getElementById("assessment");

    if (assessment) {
      window.scrollTo({
        top: assessment.offsetTop,
        behavior: "smooth"
      });
    }
  };

  const getChestPainLabel = (value) => {
    const labels = {
      TA: "Typical Angina",
      ATA: "Atypical Angina",
      NAP: "Non-Anginal Pain",
      ASY: "Asymptomatic"
    };

    return labels[value] || value;
  };

  const getSexLabel = (value) => {
    return value === "M"
      ? "Male"
      : value === "F"
        ? "Female"
        : value;
  };

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo">
          <span className="logo-heart">♥</span>

          <span>
            Cardio<span className="logo-accent">AI</span>
          </span>
        </div>

        <div className="system-status">
          <span className="status-dot"></span>
          AI SYSTEM ONLINE
        </div>

      </nav>


      <main>

        {/* ================= HERO ================= */}

        <section className="hero">

          <div className="hero-left">

            <div className="eyebrow">
              <span className="spark">✦</span>
              AI-POWERED HEALTH SCREENING
            </div>

            <h1>
              Understand your
              <span className="gradient-text">
                heart health
              </span>
            </h1>

            <p className="hero-description">
              Analyze clinical indicators using a machine
              learning model trained to identify patterns
              associated with heart disease.
            </p>

            <a
              href="#assessment"
              className="primary-button"
            >
              Start Assessment
              <span>→</span>
            </a>

            <div className="hero-mini-info">

              <div>
                <strong>11</strong>
                <span>Clinical factors</span>
              </div>

              <div>
                <strong>ML</strong>
                <span>Powered analysis</span>
              </div>

              <div>
                <strong>API</strong>
                <span>Connected pipeline</span>
              </div>

            </div>

          </div>


          {/* MODEL CARD */}

          <div className="hero-right">

            <div className="model-card">

              <div className="model-card-header">

                <span>MODEL STATUS</span>

                <div className="live-status">
                  <span className="status-dot"></span>
                  LIVE
                </div>

              </div>


              <div className="model-main">

                <div className="model-icon">
                  ♥
                </div>

                <div>

                  <div className="model-label">
                    ACTIVE MODEL
                  </div>

                  <div className="model-title">
                    Logistic Regression
                  </div>

                </div>

              </div>


              <div className="model-details">

                <div className="model-detail">

                  <span>TYPE</span>

                  <strong>
                    Classification
                  </strong>

                </div>

                <div className="model-detail">

                  <span>ENGINE</span>

                  <strong>
                    Scikit-learn
                  </strong>

                </div>

              </div>


              <div className="signal-area">

                <div className="signal-label">
                  MODEL ACTIVITY
                </div>

                <div className="signal-bars">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

              </div>


              <div className="model-footer">

                <span>
                  ● Prediction API
                </span>

                <span>
                  :8000 / :8080
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* ================= FEATURES ================= */}

        <section className="features">

          <div className="feature-card">

            <div className="feature-number">
              01
            </div>

            <div className="feature-icon">
              ◎
            </div>

            <div>
              <h3>
                Clinical Factors
              </h3>

              <p>
                Analyze 11 patient health indicators.
              </p>
            </div>

          </div>


          <div className="feature-card">

            <div className="feature-number">
              02
            </div>

            <div className="feature-icon">
              ⚡
            </div>

            <div>
              <h3>
                Instant Analysis
              </h3>

              <p>
                Receive the ML prediction within seconds.
              </p>
            </div>

          </div>


          <div className="feature-card">

            <div className="feature-number">
              03
            </div>

            <div className="feature-icon">
              ◈
            </div>

            <div>
              <h3>
                Stored Results
              </h3>

              <p>
                Prediction results are saved in MySQL.
              </p>
            </div>

          </div>

        </section>


        {/* ================= ASSESSMENT ================= */}

        <section
          id="assessment"
          className="assessment"
        >

          <div className="section-heading">

            <div className="section-number">
              STEP 01
              <span>/ PATIENT ASSESSMENT</span>
            </div>

            <h2>
              Enter clinical
              <span> information</span>
            </h2>

            <p>
              Provide the patient's clinical information
              below. CardioAI will process the values through
              the machine learning prediction pipeline.
            </p>

          </div>


          {/* ================= FORM ================= */}

          {!result && (

            <form
              className="assessment-form"
              onSubmit={handleSubmit}
            >

              {/* BASIC INFORMATION */}

              <div className="form-section">

                <div className="form-section-heading">

                  <div className="section-badge">
                    01
                  </div>

                  <div>
                    <h3>
                      Basic Information
                    </h3>

                    <p>
                      General patient information
                    </p>
                  </div>

                </div>


                <div className="form-grid">

                  <div className="form-group">

                    <label>
                      Age
                    </label>

                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="e.g. 60"
                      min="1"
                      max="120"
                      required
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Sex
                    </label>

                    <select
                      name="sex"
                      value={formData.sex}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select sex
                      </option>

                      <option value="M">
                        Male
                      </option>

                      <option value="F">
                        Female
                      </option>

                    </select>

                  </div>

                </div>

              </div>


              {/* CARDIAC INDICATORS */}

              <div className="form-section">

                <div className="form-section-heading">

                  <div className="section-badge">
                    02
                  </div>

                  <div>
                    <h3>
                      Cardiac Indicators
                    </h3>

                    <p>
                      Cardiovascular measurements
                    </p>
                  </div>

                </div>


                <div className="form-grid">

                  <div className="form-group">

                    <label>
                      Chest Pain Type
                    </label>

                    <select
                      name="chest_pain"
                      value={formData.chest_pain}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select type
                      </option>

                      <option value="TA">
                        Typical Angina
                      </option>

                      <option value="ATA">
                        Atypical Angina
                      </option>

                      <option value="NAP">
                        Non-Anginal Pain
                      </option>

                      <option value="ASY">
                        Asymptomatic
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Resting Blood Pressure
                      <span>mmHg</span>
                    </label>

                    <input
                      type="number"
                      name="resting_bp"
                      value={formData.resting_bp}
                      onChange={handleChange}
                      placeholder="e.g. 120"
                      required
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Cholesterol
                      <span>mg/dL</span>
                    </label>

                    <input
                      type="number"
                      name="cholesterol"
                      value={formData.cholesterol}
                      onChange={handleChange}
                      placeholder="e.g. 200"
                      required
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Maximum Heart Rate
                      <span>bpm</span>
                    </label>

                    <input
                      type="number"
                      name="max_hr"
                      value={formData.max_hr}
                      onChange={handleChange}
                      placeholder="e.g. 150"
                      required
                    />

                  </div>

                </div>

              </div>


              {/* TEST RESULTS */}

              <div className="form-section">

                <div className="form-section-heading">

                  <div className="section-badge">
                    03
                  </div>

                  <div>
                    <h3>
                      Test Results
                    </h3>

                    <p>
                      Diagnostic test information
                    </p>
                  </div>

                </div>


                <div className="form-grid">

                  <div className="form-group">

                    <label>
                      Fasting Blood Sugar
                    </label>

                    <select
                      name="fasting_bs"
                      value={formData.fasting_bs}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select
                      </option>

                      <option value="0">
                        No
                      </option>

                      <option value="1">
                        Yes
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Resting ECG
                    </label>

                    <select
                      name="resting_ecg"
                      value={formData.resting_ecg}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select
                      </option>

                      <option value="Normal">
                        Normal
                      </option>

                      <option value="ST">
                        ST-T Wave Abnormality
                      </option>

                      <option value="LVH">
                        Left Ventricular Hypertrophy
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Exercise Angina
                    </label>

                    <select
                      name="exercise_angina"
                      value={formData.exercise_angina}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select
                      </option>

                      <option value="N">
                        No
                      </option>

                      <option value="Y">
                        Yes
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Oldpeak
                    </label>

                    <input
                      type="number"
                      name="oldpeak"
                      value={formData.oldpeak}
                      onChange={handleChange}
                      placeholder="e.g. 1.0"
                      step="0.1"
                      required
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      ST Slope
                    </label>

                    <select
                      name="st_slope"
                      value={formData.st_slope}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select
                      </option>

                      <option value="Up">
                        Up
                      </option>

                      <option value="Flat">
                        Flat
                      </option>

                      <option value="Down">
                        Down
                      </option>

                    </select>

                  </div>

                </div>

              </div>


              {/* ERROR */}

              {error && (

                <div className="error-box">

                  <span>!</span>

                  <div>

                    <strong>
                      Connection Error
                    </strong>

                    <p>
                      {error}
                    </p>

                  </div>

                </div>

              )}


              {/* SUBMIT */}

              <div className="submit-area">

                <button
                  type="submit"
                  className="analyze-button"
                  disabled={loading}
                >

                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      ANALYZING PATIENT...
                    </>
                  ) : (
                    <>
                      ANALYZE HEART RISK
                      <span>→</span>
                    </>
                  )}

                </button>


                <div className="secure-note">

                  <span>⌁</span>

                  Data processed through the CardioAI
                  prediction pipeline

                </div>

              </div>

            </form>

          )}


          {/* ================= RESULT ================= */}

          {result && (

            <div className="result-container">

              <div className="result-card">

                {/* RESULT HEADER */}

                <div className="result-top">

                  <div>

                    <div className="result-eyebrow">
                      ✦ AI ASSESSMENT COMPLETE
                    </div>

                    <h2>
                      {result.prediction === 1
                        ? "Higher likelihood of heart disease"
                        : "Lower likelihood of heart disease"}
                    </h2>

                  </div>


                  <div className="complete-badge">
                    ✓ COMPLETE
                  </div>

                </div>


                {/* PROBABILITY */}

                <div className="result-main">

                  <div className="probability-block">

                    <div className="probability-caption">
                      MODEL PROBABILITY
                    </div>

                    <div className="probability-number">
                      {result.probability}%
                    </div>

                    <div className="probability-label">
                      Predicted probability for Class 1
                    </div>

                  </div>


                  <div className="probability-visual">

                    <div
                      className="ring"
                      style={{
                        "--progress": `${result.probability}%`
                      }}
                    >

                      <div className="ring-progress"></div>

                      <div className="ring-inner">

                        <strong>
                          {result.prediction}
                        </strong>

                        <span>
                          CLASS
                        </span>

                      </div>

                    </div>

                  </div>

                </div>


                {/* PROGRESS */}

                <div className="progress-container">

                  <div className="progress-header">

                    <span>
                      MODEL PROBABILITY
                    </span>

                    <strong>
                      {result.probability}%
                    </strong>

                  </div>


                  <div className="progress-track">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${result.probability}%`
                      }}
                    ></div>

                  </div>

                </div>


                {/* MODEL DETAILS */}

                <div className="result-details">

                  <div className="result-detail">

                    <span>
                      MODEL
                    </span>

                    <strong>
                      Logistic Regression
                    </strong>

                  </div>


                  <div className="result-detail">

                    <span>
                      PREDICTION
                    </span>

                    <strong>
                      Class {result.prediction}
                    </strong>

                  </div>


                  <div className="result-detail">

                    <span>
                      API STATUS
                    </span>

                    <strong className="api-connected">
                      ● Connected
                    </strong>

                  </div>

                </div>


                {/* PATIENT SUMMARY */}

                <div className="patient-summary">

                  <div className="summary-header">

                    <div>

                      <span className="summary-number">
                        04
                      </span>

                      <div>
                        <h3>
                          Patient Summary
                        </h3>

                        <p>
                          Submitted clinical information
                        </p>
                      </div>

                    </div>

                  </div>


                  <div className="summary-grid">

                    <div className="summary-item">

                      <span>
                        AGE
                      </span>

                      <strong>
                        {formData.age}
                      </strong>

                      <small>
                        years
                      </small>

                    </div>


                    <div className="summary-item">

                      <span>
                        SEX
                      </span>

                      <strong>
                        {getSexLabel(formData.sex)}
                      </strong>

                    </div>


                    <div className="summary-item">

                      <span>
                        BLOOD PRESSURE
                      </span>

                      <strong>
                        {formData.resting_bp}
                      </strong>

                      <small>
                        mmHg
                      </small>

                    </div>


                    <div className="summary-item">

                      <span>
                        CHOLESTEROL
                      </span>

                      <strong>
                        {formData.cholesterol}
                      </strong>

                      <small>
                        mg/dL
                      </small>

                    </div>


                    <div className="summary-item">

                      <span>
                        MAX HEART RATE
                      </span>

                      <strong>
                        {formData.max_hr}
                      </strong>

                      <small>
                        bpm
                      </small>

                    </div>


                    <div className="summary-item">

                      <span>
                        CHEST PAIN
                      </span>

                      <strong>
                        {getChestPainLabel(
                          formData.chest_pain
                        )}
                      </strong>

                    </div>


                    <div className="summary-item">

                      <span>
                        EXERCISE ANGINA
                      </span>

                      <strong>
                        {formData.exercise_angina === "Y"
                          ? "Yes"
                          : "No"}
                      </strong>

                    </div>


                    <div className="summary-item">

                      <span>
                        RESTING ECG
                      </span>

                      <strong>
                        {formData.resting_ecg}
                      </strong>

                    </div>

                  </div>

                </div>


                {/* DISCLAIMER */}

                <div className="disclaimer">

                  <span className="disclaimer-icon">
                    i
                  </span>

                  <p>
                    <strong>Important:</strong>{" "}
                    This result is generated by a machine
                    learning model and represents the model's
                    predicted probability for Class 1. It is
                    not a medical diagnosis. Consult a
                    qualified healthcare professional for
                    medical advice.
                  </p>

                </div>


                {/* NEW ASSESSMENT */}

                <button
                  className="new-assessment-button"
                  onClick={handleNewAssessment}
                >
                  ← Start New Assessment
                </button>

              </div>

            </div>

          )}

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer>

        <div className="footer-brand">

          <span className="logo-heart">
            ♥
          </span>

          Cardio<span className="logo-accent">
            AI
          </span>

        </div>

        <p>
          AI-assisted heart disease prediction system
        </p>

        <span>
          © 2026 CardioAI
        </span>

      </footer>

    </div>
  );
}

export default App;