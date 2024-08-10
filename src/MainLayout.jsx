import React from 'react';
import Header from './Header';
import ButtonList from './Mylist_button';

function MainLayout({ perfil }) {
  console.log('Perfil en MainLayout:', perfil); // Verifica que el perfil llegue aquí

  if (!perfil) return <div>Cargando perfil...</div>; // Evita renderizar si perfil es undefined

  return (
    <>
      <Header perfil={perfil} />
      <ButtonList buttonText="Mis actividades" to="/completed-tasks" />
      <ButtonList buttonText="Nueva lista" to="/my-list" />
    </>
  );
}

export default MainLayout;
