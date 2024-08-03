import React from 'react';
import ButtonList from './mylistButton.jsx';
import Header from './Header'; // Asegúrate de que el componente Header exista y esté correctamente importado


function MainLayout() {
  const userId = 1; // Aquí deberías usar el ID del usuario real


  return (
    <>
      <Header />
      <ButtonList 
        buttonText="Mis actividades" 
        to="/completed-tasks" 
        isCreateButton={false} 
      />
      <ButtonList 
        buttonText="Nueva lista" 
        userId={userId} 
        isCreateButton={true} 
      />
    </>
  );
}

export default MainLayout;