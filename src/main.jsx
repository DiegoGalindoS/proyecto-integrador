import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';  // Importa los estilos globales
import Header from './Header';
import BasicButtons from './button';  // Asegúrate de tener el archivo Boton.jsx o Boton.js en la misma carpeta
import MyList from './to do list/myList.jsx';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <App />
      <BasicButtons />
      <MyList />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
