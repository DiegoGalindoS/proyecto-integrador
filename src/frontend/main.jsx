// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import MainLayout from './MainLayout';
import Cuestionario from './Cuestionario';
import Header from './Header';
import MyList from './myList';
import CompletedTasks from './CompletedTask';
import ListDetails from './ListDetails'; // Importa el componente de detalles
import AllLists from './AllLists'; // Importa el componente de todas las listas
import Administrar from './Administrar';
import { UserProvider } from './UserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cuestionario" element={<Cuestionario />} />
        <Route path="/home" element={
            <MainLayout />
        } />
        <Route path="/my-list" element={
          <>
            <Header />
            <MyList />
          </>
        } />
        <Route path="/completed-tasks" element={
          <>
            <Header />
            <CompletedTasks />
          </>
        } />
        <Route path="/my-list/:id" element={
          <>
            <Header />
            <MyList /> {/* Renderiza MyList aquí */}
            <ListDetails /> {/* Ruta para los detalles de la lista */}
          </>
        } />
        <Route path="/all-lists" element={
          <>
            <Header />
            <AllLists /> {/* Renderiza AllLists aquí */}
          </>
        } />
        <Route path="/administrar" element={<Administrar />} />
        {/* Agrega la ruta de edición */}
      </Routes>
    </Router>
    </UserProvider>
  </React.StrictMode>
);
