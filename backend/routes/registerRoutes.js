// routes/registerRoutes.js

import express from 'express';
import { crearUsuario } from '../model/RegistroUsuario.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { nombres, apellidos, genero, email, password } = req.body;

  if (!nombres || !apellidos || !genero || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    const nuevoUsuario = await crearUsuario(nombres, apellidos, genero, email, password);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

export default router;
