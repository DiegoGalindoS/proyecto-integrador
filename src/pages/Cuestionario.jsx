import React, { useState } from 'react';
import './Cuestionairo.css';
import { useNavigate } from 'react-router-dom';

function Cuestionario({ onCreateUser }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nombres: '',
    apellidos: '',
    genero: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: ''
  });

  const handleSubmit = () => {

    onCreateUser(userData); 
    navigate('/'); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  return (
    <div className='Container'>
      <h1>Cuestionario de Registro</h1>
      <div className='Nombres'>
        <p>Nombres:</p>
        <input type="text" name="nombres" value={userData.nombres} onChange={handleChange} />
      </div>
      <div className='Apellidos'>
        <p>Apellidos:</p>
        <input type="text" name="apellidos" value={userData.apellidos} onChange={handleChange} />
      </div>
      <div className='Genero'>
        <p>Género:</p>
        <div className="GeneroOpciones">
          <div>
            <input type="checkbox" id="checkbox1" name="genero" value="Hombre" onChange={handleChange} />
            <label htmlFor="checkbox1">Hombre</label>
          </div>
          <div>
            <input type="checkbox" id="checkbox2" name="genero" value="Mujer" onChange={handleChange} />
            <label htmlFor="checkbox2">Mujer</label>
          </div>
        </div>
      </div>
      <div className='Email'>
        <p>Correo:</p>
        <input type="text" name="correo" value={userData.correo} onChange={handleChange} />
      </div>
      <div className='Save'>
        <p>Contraseña:</p>
        <input type="password" name="contraseña" value={userData.contraseña} onChange={handleChange} />
      </div>
      <div className='ConfirmacionSave'>
        <p>Confirmar Contraseña:</p>
        <input type="password" name="confirmarContraseña" value={userData.confirmarContraseña} onChange={handleChange} />
      </div>
      <div className='Guardar'>
        <button onClick={handleSubmit}>Guardar</button>
      </div>
    </div>
  );
}

export default Cuestionario;




