import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ListDetails() {
  const { id } = useParams(); // Obtiene el id de la lista desde la URL
  const [list, setList] = useState(null);

  // Cargar detalles de la lista desde el servidor
  useEffect(() => {
    const fetchListDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/lists/${id}`);
        if (response.ok) {
          const data = await response.json();
          setList(data);
        } else {
          console.error('Failed to fetch list details:', await response.text());
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchListDetails();
  }, [id]);

  if (!list) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{list.title}</h1>
      <p>{list.description}</p>
      {/* Agrega aquí más detalles y funcionalidad */}
    </div>
  );
}

export default ListDetails;
