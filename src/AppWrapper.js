// src/AppWrapper.js
import React from 'react';
import App from './App';
import { useNavigate } from 'react-router-dom';

const AppWrapper = () => {
  const navigate = useNavigate();
  return <App navigate={navigate} />;
};

export default AppWrapper;
