// src/MainLayout.jsx
import React, { useContext } from 'react';
import { UserContext } from './context/UserContext'; // Importa UserContext
import Header from './Header';
import ButtonList from './Mylist_button';

function MainLayout() {
  const { perfil } = useContext(UserContext); // Usa el contexto

  console.log('Perfil en MainLayout:', perfil);

  return (
    <>
      <Header perfil={perfil} />
      <ButtonList buttonText="Mis actividades" to="/completed-tasks" />
      <ButtonList buttonText="Nueva lista" to="/my-list" />
    </>
  );
}

export default MainLayout;
