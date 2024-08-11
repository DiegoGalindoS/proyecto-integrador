// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import MainLayout from './MainLayout';
import Cuestionario from './pages/Cuestionario';
import Administrar from './Administrar'; // Asegúrate de que esta ruta sea correcta

 // Asegúrate de que esta ruta sea correcta
import MyList from './to do list/myList';
import CompletedTasks from './CompletedTask';
import { UserProvider } from './context/UserContext'; // Importa UserProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserProvider> {/* Envuelve tu aplicación con UserProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cuestionario" element={<Cuestionario />} />
          <Route path="/home" element={<MainLayout />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/completed-tasks" element={<CompletedTasks />} />
          <Route path="/administrar" element={<Administrar />} />
          {/* Agrega la ruta de edición */}
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);
