// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import MainLayout from './MainLayout';
import Cuestionario from './Cuestionario';
import Administrar from './Administrar'; // Asegúrate de que esta ruta sea correcta
import Header from './Header';
import ListDetails from './ListDetails';
import AllLists from './AllLists'
 // Asegúrate de que esta ruta sea correcta
import MyList from './myList';
import CompletedTasks from './CompletedTask';
import { UserProvider } from './UserContext'; // Importa UserProvider

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
