// src/App.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './context/UserContext'; // Importa UserContext
import Cuestionario from './pages/Cuestionario';
import MainLayout from './MainLayout';

function App() {
  const navigate = useNavigate();
  const { setPerfil } = useContext(UserContext); // Usa setPerfil del contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      });
      const userPerfil = response.data.usuario.perfil;
      setPerfil(userPerfil); // Establece el perfil en el contexto
      navigate('/home');
    } catch (error) {
      setError('Error desconocido');
    } finally {
      setLoading(false);
    }
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
              <input 
                type="text" 
                id="username" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                autoComplete="email"
                disabled={loading}
              />
            </div>
            <div className='Contraseña'>
              <p>Contraseña:</p>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                autoComplete="current-password"
                disabled={loading}
              />
            </div>
            {error && <div className='Error'>{error}</div>}
            <div className='Buttons'>
              <button onClick={() => navigate('/cuestionario')} disabled={loading}>Registrar Usuario</button>
              <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Cargando...' : 'Ingresar'}
              </button>
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
