import React, { useState } from 'react';
import './Cuestionairo.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Cuestionario() {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    genero: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    try {
      await axios.post('http://localhost:3000/api/register', formData);
      navigate('/');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setError(error.response ? error.response.data : 'Error al registrar el usuario');
    }
  };

  return (
    <div className="container">
      <h1>Cuestionario de Registro</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="nombres">
          <label htmlFor="nombres">Nombres:</label>
          <input
            type="text"
            id="nombres"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            required
          />
        </div>
        <div className="apellidos">
          <label htmlFor="apellidos">Apellidos:</label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
        </div>
        <div className="genero">
          <label>Género:</label>
          <div className="generoOpciones">
            <div>
              <input
                type="radio"
                id="hombre"
                name="genero"
                value="Hombre"
                onChange={handleChange}
                required
              />
              <label htmlFor="hombre">Hombre</label>
            </div>
            <div>
              <input
                type="radio"
                id="mujer"
                name="genero"
                value="Mujer"
                onChange={handleChange}
                required
              />
              <label htmlFor="mujer">Mujer</label>
            </div>
          </div>
        </div>
        <div className="email">
          <label htmlFor="email">Correo:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="password">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="guardar">
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  );
}

export default Cuestionario;
