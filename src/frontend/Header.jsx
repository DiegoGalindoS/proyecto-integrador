import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ perfil }) => {
  console.log('Perfil en Header:', perfil);

  return (
    <header className="header">
      <img src="./images/logo.png" alt="Logo" />
        
      <nav className='nav'>
        <Link to="/home">Inicio</Link>
        <Link to="/all-lists">Todas las Listas</Link> 
        <Link to="/completed-tasks">Mis actividades</Link>
        {perfil === 'Administrador' && (
        <Link to="/administrar">Administrar</Link>
          )}

      </nav>
    </header>
  );
};


export default Header;