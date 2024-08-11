// src/MainLayout.jsx
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/UserContext'; // Importa UserContext
import Header from './Header';
import ButtonList from './Mylist_button';
import axios from 'axios';

function MainLayout() {
  const { perfil } = useContext(UserContext); // Usa el contexto
  const [frase, setFrase] = useState('');

  // Obtener una frase desde MongoDB cuando el componente se monte
  useEffect(() => {
    const fetchFrase = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/frases');
        if (response.data.length > 0) {
          setFrase(response.data[0].texto); // Almacena la frase en el estado
        }
      } catch (error) {
        console.error('Error al obtener la frase:', error);
      }
    };

    fetchFrase();
  }, []);

  console.log('Perfil en MainLayout:', perfil);

  return (
    <>
      <Header perfil={perfil} />
      <ButtonList buttonText="Mis actividades" to="/completed-tasks" />
      <ButtonList buttonText="Nueva lista" to="/my-list" />
      {frase && <p>Frase del día: "{frase}"</p>} {/* Muestra la frase */}
    </>
  );
}

export default MainLayout;
