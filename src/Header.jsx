import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="images/logo.png" alt="Logo" />
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/home">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link to="/my-list">Listas</Link>
          </li>
          <li className="nav-item">
            <Link to="/completed-tasks">Mis Listas</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
