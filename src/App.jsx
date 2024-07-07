import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Cuestionario from './pages/Cuestionario';  // Asegúrate de que esta ruta es correcta

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const handleCreateUser = () => {
    navigate('/cuestionario');
  };

  return (
    <>
      <Routes>
        <Route path="/" element={
          <div>
            <div>
              <img src="/images/logo.png" alt="Logo" />
            </div>
            <div className='Usuario'>
              <p>Usuario:</p>
              <input type="text" />
            </div>
            <div className='Contraseña'>
              <p>Contraseña:</p>
              <input type="text" />
            </div>
            <div className='Buttons'>
              <button onClick={handleCreateUser}>Create User</button>
              <button>Log In</button>
            </div>
          </div>
        } />
        <Route path="/cuestionario" element={<Cuestionario />} />
      </Routes>
    </>
  );
}

export default App;

 
