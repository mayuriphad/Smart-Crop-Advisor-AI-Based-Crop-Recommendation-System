import { useState } from "react";
import axios from "axios";
import "./App.css"; // Make sure this file exists with your styles

function App() {
  const [form, setForm] = useState({
    N: "", P: "", K: "",
    temperature: "", humidity: "", ph: "", rainfall: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/predict", form);
      setResult(res.data);
    } catch (err) {
      setResult({ error: "Server error: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center text-success mb-5">🌿 Crop Recommendation System</h2>

      <div className="card shadow p-4 mb-5">
        <form onSubmit={handleSubmit} className="row g-4">
          {Object.keys(form).map((key) => (
            <div className="col-md-4" key={key}>
              <label className="form-label fw-bold">{key.toUpperCase()}</label>
              <input
                type="number"
                step="any"
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="form-control"
                placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                required
              />
            </div>
          ))}
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary px-4">
              {loading ? "Predicting..." : "Get Recommendation"}
            </button>
          </div>
        </form>
      </div>

      {result && !result.error && (
        <div className="card border-success shadow p-4">
          <h4 className="text-success text-center mb-3">
            🌾 Recommended Crop:{" "}
            <span className="badge bg-success fs-5">
              {result.crop.toUpperCase()}
            </span>
          </h4>
          <p className="text-center fs-5 fst-italic text-primary">
            💬 {result.explanation}
          </p>
        </div>
      )}

      {result?.error && (
        <div className="alert alert-danger text-center mt-4">
          ❌ {result.error}
        </div>
      )}
    </div>
  );
}

export default App;
