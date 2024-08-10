import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import MainLayout from './MainLayout';
import Cuestionario from './pages/Cuestionario';
import Administrar from './Administrar'; // Asegúrate de que esta ruta sea correcta
import Header from './Header';
import MyList from './to do list/myList';
import CompletedTasks from './CompletedTask';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cuestionario" element={<Cuestionario />} />
        <Route path="/home" element={<MainLayout />} /> {/* Pasa el perfil aquí */}
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
        <Route path="/administrar" element={<Administrar />} /> {/* Agrega la ruta para la página de administración */}
      </Routes>
    </Router>
  </React.StrictMode>
);
