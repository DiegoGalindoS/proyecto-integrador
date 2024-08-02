// models/RegistroUsuario.js

import pool from '../config/database.js';

// Función para crear un nuevo usuario
export const crearUsuario = async (nombres, apellidos, genero, email, password) => {
  if (!nombres || !apellidos || !genero || !email || !password) {
    throw new Error('Todos los campos son requeridos');
  }

  try {
    const query = 'INSERT INTO registro_usuarios (nombres, apellidos, genero, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [nombres, apellidos, genero, email, password];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw new Error('Error al crear usuario');
  }
};

// Función para encontrar un usuario por email y contraseña
export const encontrarUsuarioPorCredenciales = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email y contraseña son requeridos');
  }

  try {
    const query = 'SELECT * FROM registro_usuarios WHERE email = $1 AND password = $2';
    const values = [email, password];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error al encontrar usuario:', error);
    throw new Error('Error al encontrar usuario');
  }
};
