// main.jsx (or index.jsx)
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Navbar from './components/Navbar';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <Navbar />
  </BrowserRouter>,
);
