// ToastContext.js
import React, { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const showToast = (message) => {
    toast.success(message);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer position='bottom-right' autoClose="1750"/>
    </ToastContext.Provider>
  );
};
