import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import MainLayout from './MainLayout';
import Cuestionario from './pages/Cuestionario';
import Header from './Header';
import MyList from './to do list/myList';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cuestionario" element={<Cuestionario />} />
        <Route path="/home" element={<MainLayout />} />
        <Route path="/my-list" element={<>
          <Header />
          <MyList />
        </>} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
