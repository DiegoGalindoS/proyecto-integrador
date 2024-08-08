import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import App from './App';
import MainLayout from './MainLayout';
import Cuestionario from './pages/Cuestionario';
import Header from './Header';
import MyList from './to do list/myList'; // Renombrado a 'todo-list'
import CompletedTasks from './CompletedTask';
import Administrar from './Administrar'; // Asegúrate de importar el componente

const root = ReactDOM.createRoot(document.getElementById('root'));

const ProtectedRoute = ({ element, requiredRole }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // Asegúrate de obtener el token de donde lo estés almacenando
        if (!token) {
          setLoading(false);
          return;
        }
        const response = await axios.get('/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Cargando...</div>; // Puedes reemplazar esto con un spinner u otro indicador de carga
  }

  return user?.perfil === requiredRole ? element : <Navigate to="/home" />;
};

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cuestionario" element={<Cuestionario />} />
        <Route path="/home" element={<MainLayout />} />
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
        {/* Ruta protegida para administradores */}
        <Route path="/administrar" element={
          <ProtectedRoute element={<>
            <Header />
            <Administrar />
          </>} requiredRole="Administrador" />
        } />
      </Routes>
    </Router>
  </React.StrictMode>
);
