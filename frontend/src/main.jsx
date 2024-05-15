import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from './context/toastContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ToastProvider>
      <App />
      </ToastProvider>
    </AuthProvider>
  </BrowserRouter>
)
