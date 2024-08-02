// App.jsx

import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Cuestionario from './pages/Cuestionario';
import MainLayout from './MainLayout';
import axios from 'axios';

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Nuevo estado para manejar la carga

  const handleLogin = async () => {
    setLoading(true); // Activar el estado de carga
    setError(''); // Limpiar el error anterior

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      navigate('/home'); // Navega a la página de inicio después del login exitoso
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Email o contraseña incorrectos'); // Muestra el error en el estado
    } finally {
      setLoading(false); // Desactivar el estado de carga
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
                autoComplete="email" // Agrega el atributo autocomplete
                disabled={loading} // Desactiva el input mientras se carga
              />
            </div>
            <div className='Contraseña'>
              <p>Contraseña:</p>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                autoComplete="current-password" // Agrega el atributo autocomplete
                disabled={loading} // Desactiva el input mientras se carga
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
