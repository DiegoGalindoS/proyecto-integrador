// server.js

import express from 'express';
import cors from 'cors';
import pkg from 'pg'; // Importa el módulo pg completo
import registerRoutes from './routes/registerRoutes.js';

const { Pool } = pkg; // Extrae Pool del paquete pg

const app = express();
const port = process.env.PORT || 3000;

// Configura la conexión a la base de datos PostgreSQL
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'loginem',
  password: '123',
  port: 5432,
});

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Hacer que el pool esté disponible para las rutas a través de app.locals
app.locals.pool = pool;

// Rutas
app.use('/api/register', registerRoutes);

// Manejo de errores global (opcional, pero recomendado)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
