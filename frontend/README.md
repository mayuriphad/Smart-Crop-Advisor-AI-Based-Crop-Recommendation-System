# 🌿 Crop Recommendation System (GenAI + ML)

A smart crop suggestion system for farmers using a trained ML model and Google Gemini 1.5 (GenAI) for explanations and fallbacks.

---

## 🚀 Features

- 🔍 Predicts the best crop based on:
  - Nitrogen (N), Phosphorus (P), Potassium (K)
  - Temperature, Humidity, pH, Rainfall
- 🤖 Integrates **Google Gemini 1.5** to:
  - Explain the recommended crop
  - Suggest a crop if the ML model fails
- 💻 Built with:
  - **React.js** frontend
  - **Express.js** middleware API
  - **Flask + Python** microservice with ML + GenAI
- 📦 ML model trained on [Kaggle Crop Recommendation Dataset](https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset)

---

## 🧠 How It Works

1. User submits crop condition data via a React form.
2. Express backend proxies the request to Flask.
3. Flask:
   - Uses the trained ML model to predict the best crop.
   - If ML fails, Gemini 1.5 generates the prediction.
   - Gemini also explains why that crop is suitable.
4. Response is shown in React.

---


