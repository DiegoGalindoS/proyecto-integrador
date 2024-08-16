// UserProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{user.nombres} {user.apellidos}</h1>
      <p>Email: {user.email}</p>
      <p>Género: {user.genero}</p>
      <p>País: {user.pais_id}</p>
      {/* Muestra otros datos según lo que esté disponible */}
    </div>
  );
}

export default UserProfile;
