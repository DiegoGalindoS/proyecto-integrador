import { useEffect, useState } from "react";
import { getUsers } from "../services/userServices";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      setError('Error al obtener usuarios');
    }
  };

  // Función para eliminar usuario (deberás implementar esto con la llamada al backend)
  const handleDelete = async (userId) => {
    try {
      await fetch(`http://localhost:3000/api/admin/usuarios/${userId}`, {
        method: 'DELETE'
      });
      // Actualizar la lista de usuarios
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      setError('Error al eliminar usuario');
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombres</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Género</th>
            <th scope="col">Correo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.nombres}</td>
              <td>{user.apellidos}</td>
              <td>{user.genero}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                {/* Agregar enlace o botón para editar si es necesario */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}