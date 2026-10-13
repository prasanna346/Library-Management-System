import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './home';
import reportWebVitals from './reportWebVitals';

// Send relative API requests to the deployed Spring Boot backend in production.
// Local development keeps using the CRA proxy configured in package.json.
const apiBaseUrl = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');
if (apiBaseUrl) {
  const originalFetch = window.fetch.bind(window);
  window.fetch = (resource, options) => {
    if (typeof resource === 'string' && resource.startsWith('/api/')) {
      resource = apiBaseUrl + resource;
    } else if (resource instanceof URL && resource.pathname.startsWith('/api/')) {
      resource = apiBaseUrl + resource.pathname + resource.search;
    }
    return originalFetch(resource, options);
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

reportWebVitals();
