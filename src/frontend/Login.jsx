import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { UserContext } from './UserContext'; // Importa UserContext
import Cuestionario from './Cuestionario';
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
      console.log("Enviando solicitud de autenticación...");
      
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password,
      });
      
      console.log("Respuesta recibida:", response);
      
      if (response.status === 200) {
        const userPerfil = response.data.perfil;
        setPerfil(userPerfil);
        navigate('/home');
      } else {
        setError('Error desconocido en la autenticación');
      }
    } catch (error) {
      console.error("Error en el login:", error);
      if (error.response?.status === 401) {
        setError('Credenciales incorrectas');
      } else {
        setError('Error desconocido');
      }
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