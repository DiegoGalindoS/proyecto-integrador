import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Administrar.css'; // Importa el archivo CSS

function Administrar() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null); // Estado para manejar el usuario en edición
  const [editFormData, setEditFormData] = useState({
    nombres: '',
    apellidos: '',
    pais_id: '',
  }); // Estado para manejar los datos del formulario de edición

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users');
        setUsuarios(response.data);
      } catch (error) {
        setError('Error al obtener los usuarios');
      }
    };

    fetchUsuarios();
  }, []);

  const handleEliminar = async (email) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${email}`);
      setUsuarios(usuarios.filter(usuario => usuario.email !== email));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      setError('Error al eliminar el usuario');
    }
  };

  const handleEditar = (email) => {
    const userToEdit = usuarios.find(usuario => usuario.email === email);
    setEditUser(email);
    setEditFormData({
      nombres: userToEdit.nombres,
      apellidos: userToEdit.apellidos,
      pais_id: userToEdit.pais_id,
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/users/${editUser}`, editFormData);
      setUsuarios(usuarios.map(usuario => (
        usuario.email === editUser ? { ...usuario, ...editFormData } : usuario
      )));
      setEditUser(null); // Terminar la edición
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      setError('Error al actualizar el usuario');
    }
  };

  if (error) {
    return <div className='error-message'>Error: {error}</div>;
  }

  return (
    <div className='admin-container'>
      <h1>Administrar Usuarios</h1>
      <table className='admin-table'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.email}>
              <td>{usuario.nombres}</td>
              <td>{usuario.apellidos}</td>
              <td>{usuario.email}</td>
              <td>{usuario.pais_id}</td>
              <td>
                <button className='delete' onClick={() => handleEliminar(usuario.email)}>Eliminar</button>
                <button className='edit' onClick={() => handleEditar(usuario.email)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUser && (
        <form className='edit-form' onSubmit={handleEditFormSubmit}>
          <h2>Editar Usuario</h2>
          <label>
            Nombre:
            <input
              type="text"
              name="nombres"
              value={editFormData.nombres}
              onChange={handleEditFormChange}
            />
          </label>
          <label>
            Apellido:
            <input
              type="text"
              name="apellidos"
              value={editFormData.apellidos}
              onChange={handleEditFormChange}
            />
          </label>
          <label>
            País:
            <input
              type="text"
              name="pais_id"
              value={editFormData.pais_id}
              onChange={handleEditFormChange}
            />
          </label>
          <button type="submit" className='save'>Guardar</button>
          <button type="button" className='cancel' onClick={() => setEditUser(null)}>Cancelar</button>
        </form>
      )}
    </div>
  );
}

export default Administrar;
