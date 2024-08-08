import express from 'express';
import { encontrarUsuarioPorCredenciales } from '../model/RegistroUsuario.js'; // Asegúrate de que la ruta y el nombre del archivo sean correctos

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // Validación de entrada
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  try {
    // Buscar el usuario por sus credenciales
    const usuario = await encontrarUsuarioPorCredenciales(email, password);

    if (usuario) {
      // Si la función devuelve un usuario, significa que las credenciales son correctas
      res.status(200).json({ message: 'Inicio de sesión exitoso', usuario });
    } else {
      // Si no se encuentra el usuario o la contraseña no coincide
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    // Manejo de errores en la base de datos
    console.error('Error en la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
