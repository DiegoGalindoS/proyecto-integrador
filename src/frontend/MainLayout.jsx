import React from 'react';
import CardComponent from './CardComponent';
import Header from './Header';
import './mainLayout.css'; // Asegúrate de tener este archivo CSS para el contenedor

function MainLayout() {
  const userId = 1; // Aquí deberías usar el ID del usuario real

  return (
    <>
      <Header />
      <div className="card-container">
        <CardComponent 
          buttonText="Mis listas" 
          to="/all-lists" 
          isCreateButton={false} 
          title="Actividades" 
          description="Revisa todas tus listas y lleva un control de todas tus actividades" 
          imageSrc="https://i.pinimg.com/originals/34/3a/35/343a3584f3f51f679c51d53edb7fdfb1.png"
        />
        <CardComponent 
          buttonText="Nueva lista" 
          userId={userId} 
          isCreateButton={true} 
          title="Crear Una Lista" 
          description="Crea una nueva lista. ¡Emepiza a relajar tu mente!" 
          imageSrc="https://cdn-icons-png.flaticon.com/512/2285/2285516.png"
        />
      </div>
    </>
  );
}

export default MainLayout;
