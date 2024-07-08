import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Registro from './pages/Registro'; 
import Cuestionario from './pages/Cuestionario'; 
import MainLayout from './MainLayout';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    
    const username = 'pepito';
    const password = 'pepito';

    
    if (document.getElementById('username').value === username && document.getElementById('password').value === password) {
      setLoggedIn(true);
      navigate('/home'); 
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  const handleCreateUser = () => {
    const newUser = {
      username: 'pepito',
      password: 'pepito',
      email: 'pepito@gmail.com'
    };

    navigate('/cuestionario');
  };

  return (
    <div className='app-container'>
      <Routes>
        <Route path="/" element={
          <div>
            <div>
              <img src="/images/logo.png" alt="Logo" />
            </div>
            <div className='Usuario'>
              <p>Usuario:</p>
              <input type="text" id="username" />
            </div>
            <div className='Contraseña'>
              <p>Contraseña:</p>
              <input type="password" id="password" />
            </div>
            <div className='Buttons'>
              <button onClick={handleLogin}>Ingresar</button>
              <button onClick={handleCreateUser}>Registrar Usuario</button>
            </div>
          </div>
        } />
        <Route path="/registro" element={loggedIn ? <Registro /> : <Navigate to="/" />} />
        <Route path="/cuestionario" element={loggedIn ? <Cuestionario /> : <Navigate to="/" />} />
        <Route path="/home" element={loggedIn ? <MainLayout /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;



