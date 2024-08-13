import crypto from 'crypto';
import pool from '../config/database.js';

// Función para encriptar la contraseña
const encriptarPassword = (password) => {
  const algoritmo = 'aes-256-cbc';
  const clave = Buffer.from('e1d92c3f8b9e6eaa64d96c5c8b33a2d8e51eae8d4d5c7453f43f7c3e6e5b8d79', 'hex');
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algoritmo, clave, iv);
  let encriptado = cipher.update(password, 'utf8', 'hex');
  encriptado += cipher.final('hex');

  return `${iv.toString('hex')}:${encriptado}`;
};

// Función para desencriptar la contraseña
const desencriptarPassword = (encriptado) => {
  const [ivHex, contenidoEncriptado] = encriptado.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const clave = Buffer.from('e1d92c3f8b9e6eaa64d96c5c8b33a2d8e51eae8d4d5c7453f43f7c3e6e5b8d79', 'hex');
  const algoritmo = 'aes-256-cbc';

  const decipher = crypto.createDecipheriv(algoritmo, clave, iv);
  let desencriptado = decipher.update(contenidoEncriptado, 'hex', 'utf8');
  desencriptado += decipher.final('utf8');

  return desencriptado;
};

// Función para crear un nuevo usuario
export const crearUsuario = async (nombres, apellidos, genero, email, password, confirmar_password, pais_id) => {
  if (!nombres || !apellidos || !genero || !email || !password || !pais_id || !confirmar_password) {
    throw new Error('Todos los campos son requeridos');
  }

  try {
    const passwordEncriptada = encriptarPassword(password);

    const query = 'INSERT INTO registro_usuarios (nombres, apellidos, genero, email, password, confirmar_password, pais_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [nombres, apellidos, genero, email, passwordEncriptada, confirmar_password, pais_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw new Error('Error al crear usuario');
  }
};



// Función para encontrar un usuario por email y contraseña
export const encontrarUsuarioPorCredenciales = async (email, password) => {
  try {
    // Buscar usuario por email
    const query = 'SELECT * FROM registro_usuarios WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);

    // Obtener el usuario encontrado
    const usuario = result.rows[0];

    if (usuario) {
      // Desencriptar la contraseña almacenada
      const passwordDesencriptada = desencriptarPassword(usuario.password);

      // Comparar la contraseña proporcionada con la desencriptada
      if (password === passwordDesencriptada) {
        return usuario; // Contraseña correcta
      } else {
        return null; // Contraseña incorrecta
      }
    } else {
      return null; // Usuario no encontrado
    }
  } catch (error) {
    console.error('Error al encontrar usuario:', error);
    throw new Error('Error al encontrar usuario');
  }
};
