import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css'; // Make sure this exists
import App from './App';
import reportWebVitals from './reportWebVitals';

// ✅ Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Web vitals
reportWebVitals();
