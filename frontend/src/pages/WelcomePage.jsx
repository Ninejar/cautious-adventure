import React from 'react';
import { Link } from 'react-router-dom';
import RoleButtons from '../components/RoleButtons/RoleButtons';
import '../components/RoleButtons/Rolebuttons.css'; // Import the CSS file

const WelcomePage = () => {
  return (
    <>
      <p>Welcome</p>

      <a href="/login" data-testid="loginyouknow">Login</a>
      <a href="/Signup">Signup</a>
    
    </>
  );
};

export default WelcomePage;
