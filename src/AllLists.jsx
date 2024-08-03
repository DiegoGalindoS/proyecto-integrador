import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './allLists.css'; // Asegúrate de que la ruta es correcta

const AllLists = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/lists'); // Ajusta la URL según tu API
        if (response.ok) {
          const data = await response.json();
          setLists(data);
        } else {
          console.error('Failed to fetch lists:', await response.text());
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchLists();
  }, []);

  return (
    <div className="all-lists">
      <h1>Mis Listas</h1>
      <ul className="list-items">
        {lists.map(list => (
          <li key={list.id} className="list-item">
            <Link to={`/my-list/${list.id}`} className="list-link">
              {list.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllLists;
