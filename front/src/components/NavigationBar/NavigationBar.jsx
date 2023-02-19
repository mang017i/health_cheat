import React from 'react';
import "./NavigationBar.css";
import {useNavigate} from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  }


  return (
    <div className="navigation-bar">
      <div className="navigation-bar__logo">
        <span onClick={() => handleNavigation("/")}>Logo</span>
      </div>
      <div className="navigation-bar__menu">
        <ul>
          <li onClick={() => handleNavigation("/")}>Accueil</li>
          <li onClick={() => handleNavigation("/cheats")}>Glossaire des fiches</li>
          <li onClick={() => handleNavigation("/profile")}>Profile</li>
          <li onClick={() => handleNavigation("/login")}>Login</li>
          <li onClick={() => handleNavigation("/register")}>Register</li>
        </ul>
      </div>
    </div>
  );
}


export default NavigationBar;
