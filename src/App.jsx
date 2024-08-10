import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [perfil, setPerfil] = useState(null); // Estado para guardar el perfil del usuario

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);

      // Verifica la estructura de la respuesta
      console.log('Estructura de respuesta:', response.data);
      const userPerfil = response.data.usuario.perfil;
      console.log('Perfil recibido:', userPerfil);
      setPerfil(userPerfil);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError(error.response && error.response.data ? error.response.data.error : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  // UseEffect para manejar la navegación después de que el perfil esté definido
  useEffect(() => {
    if (perfil) {
      console.log('Navegando a /home con perfil:', perfil);
      navigate('/home'); // Navega a la página de inicio después de que perfil esté definido
    }
  }, [perfil, navigate]);

  console.log('Perfil en App:', perfil);

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
        <Route 
          path="/home" 
          element={perfil ? <MainLayout perfil={perfil} /> : <div>Cargando perfil...</div>} 
        />
      </Routes>
    </div>
  );
}

export default App;
