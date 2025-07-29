import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './tailwind.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecommendationsProvider } from './contexts/Recommendation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecommendationsProvider>
      <App />
    </RecommendationsProvider>
  </React.StrictMode>
);

reportWebVitals();
