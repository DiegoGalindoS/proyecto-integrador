import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cuestionairo.css';

function Cuestionario() {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [genero, setGenero] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmacionContraseña, setConfirmacionContraseña] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  const navigate = useNavigate(); 

  useEffect(() => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    setUsuarios(usuariosGuardados);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contraseña !== confirmacionContraseña) {
      alert('Las contraseñas no coinciden');
      return;
    }
    const nuevoUsuario = {
      nombres,
      apellidos,
      genero,
      correo,
      contraseña,
    };
    const nuevosUsuarios = [...usuarios, nuevoUsuario];
    setUsuarios(nuevosUsuarios);
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios)); 

    
    setNombres('');
    setApellidos('');
    setGenero('');
    setCorreo('');
    setContraseña('');
    setConfirmacionContraseña('');

    
    navigate('/');
  };

  return (
    <div className='Container'>
      <h1>Cuestionario de Registro</h1>
      <form onSubmit={handleSubmit}>
        <div className='Nombres'>
          <p>Nombres:</p>
          <input type="text" value={nombres} onChange={(e) => setNombres(e.target.value)} />
        </div>
        <div className='Apellidos'>
          <p>Apellidos:</p>
          <input type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
        </div>
        <div className='Genero'>
          <p>Género:</p>
          <div className="GeneroOpciones">
            <div>
              <input type="radio" id="hombre" name="genero" value="Hombre" onChange={(e) => setGenero(e.target.value)} />
              <label htmlFor="hombre">Hombre</label>
            </div>
            <div>
              <input type="radio" id="mujer" name="genero" value="Mujer" onChange={(e) => setGenero(e.target.value)} />
              <label htmlFor="mujer">Mujer</label>
            </div>
          </div>
        </div>
        <div className='Email'>
          <p>Correo:</p>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </div>
        <div className='Contraseña'>
          <p>Contraseña:</p>
          <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
        </div>
        <div className='ConfirmacionContraseña'>
          <p>Confirmar Contraseña:</p>
          <input type="password" value={confirmacionContraseña} onChange={(e) => setConfirmacionContraseña(e.target.value)} />
        </div>
        <div className='Guardar'>
          <button type="submit">Guardar</button>
        </div>
      </form>
      <h2>Usuarios Registrados</h2>
      <ul>
        {usuarios.map((usuario, index) => (
          <li key={index}>
            {usuario.nombres} {usuario.apellidos} - {usuario.genero} - {usuario.correo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cuestionario;


