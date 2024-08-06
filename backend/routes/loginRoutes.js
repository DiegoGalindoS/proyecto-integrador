import express from 'express';
import { encontrarUsuarioPorCredenciales } from '../models/RegistroUsuario.js'; // Asegúrate de que la ruta y el nombre del archivo sean correctos

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  try {
    const usuario = await encontrarUsuarioPorCredenciales(email, password); // Asumiendo que la función puede manejar ambos parámetros
    if (usuario) {
      if (password === usuario.password) {
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
      } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
      }
    } else {
      res.status(401).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error en la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;