import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Cuestionario from './pages/Cuestionario';
import MainLayout from './MainLayout';

function App() {
  const navigate = useNavigate();

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
              <button onClick={() => navigate('/cuestionario')}>Registrar Usuario</button>
              <button onClick={() => navigate('/home')}>Ingresar</button>
            </div>
          </div>
        } />
        <Route path="/cuestionario" element={<Cuestionario />} />
        <Route path="/home" element={<MainLayout />} />
      </Routes>
    </div>
  );
}

export default App;




