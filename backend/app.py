from flask import Flask, request, jsonify
import numpy as np
import joblib
import os
import google.generativeai as genai
from dotenv import load_dotenv

# 🔐 Load environment variables (for Gemini API Key)
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# 🤖 Configure Gemini
genai.configure(api_key=GOOGLE_API_KEY)
gemini = genai.GenerativeModel("gemini-1.5-flash")

# 🚀 Initialize Flask
app = Flask(__name__)

# 📦 Load the ML model
model = joblib.load("crop_recommendation_model.pkl")

# 🧠 Predict Route
@app.route("/predict", methods=["POST"])
def predict_crop():
    try:
        data = request.get_json()

        # 🔢 Extract inputs
        N = float(data['N'])
        P = float(data['P'])
        K = float(data['K'])
        temp = float(data['temperature'])
        humidity = float(data['humidity'])
        ph = float(data['ph'])
        rainfall = float(data['rainfall'])

        crop = None
        explanation = None

        # 🔍 Try ML model prediction
        try:
            features = np.array([[N, P, K, temp, humidity, ph, rainfall]])
            crop = model.predict(features)[0]
        except Exception:
            crop = None  # Fall back to GenAI

        # 🧠 Prepare prompt for Gemini
        if crop:
            prompt = f"""
            Given the following values:
            Nitrogen: {N}, Phosphorus: {P}, Potassium: {K}, Temperature: {temp}°C,
            Humidity: {humidity}%, pH: {ph}, Rainfall: {rainfall} mm,
            the recommended crop is {crop}.

            Explain in 2-3 lines why {crop} is suitable for these conditions.
            """
        else:
            prompt = f"""
            Based on the following soil and climate parameters:
            - Nitrogen: {N}
            - Phosphorus: {P}
            - Potassium: {K}
            - Temperature: {temp}°C
            - Humidity: {humidity}%
            - pH: {ph}
            - Rainfall: {rainfall} mm

            Predict the best crop to grow and explain the reasoning in 2-3 lines.
            Return only the crop name first, then the explanation.
            """

        # 💬 Gemini Prediction + Explanation
        gemini_response = gemini.generate_content(prompt)
        output = gemini_response.text.strip()

        if crop is None:
            # If Gemini gave both crop + explanation
            lines = output.split("\n", 1)
            crop = lines[0].strip()
            explanation = lines[1].strip() if len(lines) > 1 else "Explanation not available."
        else:
            explanation = output

        return jsonify({
            "crop": crop,
            "explanation": explanation
        })

    except Exception as e:
        return jsonify({"error": "Something went wrong. Please try again later."}), 500

# 🟢 Run Flask on port 5001
if __name__ == "__main__":
    app.run(debug=True, port=5001)
