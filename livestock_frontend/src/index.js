import React from 'react';
import ReactDOM from 'react-dom/client';  //  Use createRoot
import App from './App'; // Import your main App component
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));  //  Create a root
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
