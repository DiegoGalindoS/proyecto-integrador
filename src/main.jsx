import React from 'react';
import ReactDOM from 'react-dom/client'; // Usar ReactDOM.createRoot
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import MainLayout from './MainLayout';
import Cuestionario from './pages/Cuestionario';
import Header from './Header';
import MyList from './to do list/myList'; // Renombra la carpeta a 'todo-list'
import CompletedTasks from './CompletedTask';

const root = ReactDOM.createRoot(document.getElementById('root'));

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
          </>} />
      </Routes>
    </Router>
  </React.StrictMode>
);