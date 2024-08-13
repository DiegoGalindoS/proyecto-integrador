import express from 'express';
import { crearUsuario } from '../model/RegistroUsuario.js';

const router = express.Router();
router.post('/', async (req, res) => {
  const { nombres, apellidos, genero, email, password, pais_id } = req.body;

  if (!nombres || !apellidos || !genero || !email || !password || !pais_id) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    // Crear un nuevo usuario, la contraseña será encriptada en la función `crearUsuario`
    const nuevoUsuario = await crearUsuario(nombres, apellidos, genero, email, password, pais_id);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

router.get('/paises', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const result = await pool.query('SELECT * FROM paises');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener la lista de países:', error);
    res.status(500).send('Error al obtener la lista de países');
  }
});

export default router;
