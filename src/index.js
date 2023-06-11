import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import TypingApp from './components/Typing-App/TypingApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <TypingApp />
  </React.StrictMode>
);

reportWebVitals();
