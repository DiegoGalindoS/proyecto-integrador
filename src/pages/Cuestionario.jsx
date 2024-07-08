import React from 'react';
import './Cuestionairo.css';
import { useNavigate } from 'react-router-dom';

function Cuestionario() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/');
  };

  return (
    <div className='Container'>
      <h1>Cuestionario de Registro</h1>
      <div className='Nombres'>
        <p>Nombres:</p>
        <input type="text" id="nombres" />
      </div>
      <div className='Apellidos'>
        <p>Apellidos:</p>
        <input type="text" id="apellidos" />
      </div>
      <div className='Genero'>
        <p>Género:</p>
        <div className="GeneroOpciones">
          <div>
            <input type="checkbox" id="checkbox1" name="genero" value="Hombre" />
            <label htmlFor="checkbox1">Hombre</label>
          </div>
          <div>
            <input type="checkbox" id="checkbox2" name="genero" value="Mujer" />
            <label htmlFor="checkbox2">Mujer</label>
          </div>
        </div>
      </div>
      <div className='Email'>
        <p>Correo:</p>
        <input type="text" id="correo" />
      </div>
      <div className='Save'>
        <p>Contraseña:</p>
        <input type="password" id="contraseña" />
      </div>
      <div className='ConfirmacionSave'>
        <p>Confirmar Contraseña:</p>
        <input type="password" id="confirmarContraseña" />
      </div>
      <div className='Guardar'>
        <button onClick={handleSubmit}>Guardar</button>
      </div>
    </div>
  );
}

export default Cuestionario;


