import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <img src="images/logo.png" alt="Logo" />
        
      <nav className='nav'>
        <a><Link to="/home">Inicio</Link></a>
        <a><Link to="/all-lists">Todas las Listas</Link> </a>
        <a ><Link to="/completed-tasks">Mis actividades</Link></a>

      </nav>
    </header>
  );
}


export default Header;

