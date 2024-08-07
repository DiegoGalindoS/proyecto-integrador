import bcrypt from 'bcrypt';
import pool from '../config/database.js';

// Función para crear un nuevo usuario
export const crearUsuario = async (nombres, apellidos, genero, email, password, pais_id) => {
  if (!nombres || !apellidos || !genero || !email || !password || !pais_id) {
    throw new Error('Todos los campos son requeridos');
  }
  try {
    // Encriptar la contraseña antes de guardarla
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log('Contraseña encriptada:', hashedPassword);

    const query = 'INSERT INTO registro_usuarios (nombres, apellidos, genero, email, password, pais_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [nombres, apellidos, genero, email, hashedPassword, pais_id];
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
