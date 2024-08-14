import React, { useState, useEffect } from 'react';
import './Cuestionairo.css'; // Asegúrate que el nombre del archivo CSS esté correctamente escrito
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Cuestionario() {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    genero: '',
    email: '',
    password: '',
    pais_id: '',
    confirmar_password: '' // Nombre del campo corregido para coincidir con el select
  });

  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [paises, setPaises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar países desde el backend
    const cargarPaises = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/register/paises'); // Ruta corregida para cargar países
        setPaises(response.data);
      } catch (error) {
        console.error('Error al cargar los países:', error);
        setError('No se pudieron cargar los países.'); // Mostrar error en la UI
      }
    };

    cargarPaises();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePassword = (password) => {
    const minLength = 4;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'La contraseña debe tener al menos 4 caracteres.';
    }
    if (!hasUpperCase) {
      return 'La contraseña debe contener al menos una letra mayúscula.';
    }
    if (!hasLowerCase) {
      return 'La contraseña debe contener al menos una letra minúscula.';
    }
    if (!hasNumber) {
      return 'La contraseña debe contener al menos un número.';
    }
    if (!hasSpecialChar) {
      return 'La contraseña debe contener al menos un carácter especial.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
  
    const passwordValidationError = validatePassword(formData.password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }
  
    if (formData.password !== formData.confirmar_password) {
      setPasswordError('Las contraseñas no coinciden.');
      return;
    }
  
    setPasswordError(null);
  
    try {
      await axios.post('http://localhost:3000/api/register', formData);
      navigate('/'); // Navegación post-registro (Asegúrate que esta ruta sea correcta según tu estructura de rutas)
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setError(error.response && error.response.data.error ? error.response.data.error : 'Error al registrar el usuario');
    }
  };
  
  return (
    <div className="container">
      <h1>Cuestionario de Registro</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
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
            <input
              type="radio"
              id="hombre"
              name="genero"
              value="Hombre"
              onChange={handleChange}
              required
            />
            <label htmlFor="hombre">Hombre</label>
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
        <div className="confirmar_password">
          <label htmlFor="confirmar_password">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmar_password"
            name="confirmar_password"
            value={formData.confirmar_password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="pais">
          <label htmlFor="pais_id">País:</label>
          <select
            id="pais_id"
            name="pais_id"
            value={formData.pais_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un país</option>
            {paises.map(pais => (
              <option key={pais.id} value={pais.id}>
                {pais.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="guardar">
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  );
}

export default Cuestionario;