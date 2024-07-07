import React from 'react';
import './Cuestionairo.css';

function Cuestionario() {
  return (
    <div className='Container'>
      <h1>Cuestionario de Registro</h1>
      <div className='Nombres'>
        <p>Nombres:</p>
        <input type="text" />
      </div>
      <div className='Apellidos'>
        <p>Apellidos:</p>
        <input type="text" />
      </div>
      <div className='Genero'>
        <p>Género:</p>
        <div className="GeneroOpciones">
          <div>
            <input type="checkbox" id="checkbox1" name="option1"></input>
            <label htmlFor="checkbox1">Hombre</label>
          </div>
          <div>
            <input type="checkbox" id="checkbox2" name="option1"></input>
            <label htmlFor="checkbox2">Mujer</label>
          </div>
        </div>
      </div>
      <div className='Email'>
        <p>Correo:</p>
        <input type="text" />
      </div>
      <div className='Save'>
        <p>Contraseña:</p>
        <input type="text" />
      </div>
      <div className='ConfirmacionSave'>
        <p>Confirmar Contraseña:</p>
        <input type="text" />
      </div>
      <div className='Guardar'>
        <button>Guardar</button>
      </div>
    </div>
  );
}

export default Cuestionario;

