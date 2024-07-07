// Header.jsx
import React from 'react';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="images\logo.png" alt="" />
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><a href="#home">Inicio</a></li>
          <li className="nav-item"><a href="#about">Listas</a></li>
          <li className="nav-item"><a href="#contact">Mis Listas</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
