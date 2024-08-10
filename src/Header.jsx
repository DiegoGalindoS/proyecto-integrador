import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ perfil }) => {
  useEffect(() => {
    console.log('Perfil en Header:', perfil);
  }, [perfil]);

  return (
    <header className="header">
      <div className="logo">
        <img src="/images/logo.png" alt="Logo" />
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
            <Link to="/completed-tasks">Mis actividades</Link>
          </li>
          {perfil === 'Administrador' && (
            <li className="nav-item">
              <Link to="/administrar">Administrar</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
