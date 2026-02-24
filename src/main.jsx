// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast'; // Import here
import App from './App.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#776a6a',
          color: '#fff',
        },
        success: {
          duration: 2000,
          iconTheme: {
            primary: '#10B981',
            secondary: '#fff',
          },
        },
        loading: {
          duration: 1000,
        },
      }}
    />
    <App />
  </React.StrictMode>
);