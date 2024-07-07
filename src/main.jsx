import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Importa los estilos globales
import Header from './Header';
import BasicButtons from './button';  // Asegúrate de tener el archivo Boton.jsx o Boton.js en la misma carpeta
import MyList from './to do list/myList.jsx';
import ButtonList from './Mylist_button';




ReactDOM.render(
  <React.StrictMode>
    <Header />
    <MyList />
    <ButtonList buttonText="Mis listas" />
    <ButtonList buttonText="Nueva lista" />   
  </React.StrictMode>,
  document.getElementById('root')
);