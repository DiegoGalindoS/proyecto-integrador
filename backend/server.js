import express from 'express';
import cors from 'cors';
import pkg from 'pg'; // Importa el módulo pg completo
import registerRoutes from './routes/registerRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import userRoutes from './routes/userRoutes.js';
import fraseRoutes from './routes/fraseRoutes.js'; // Importa la ruta de usuarios
import pool from './config/database.js';
import connectMongoDB from './config/mongodb.js';

const { Pool } = pkg; // Extrae Pool del paquete pg

const app = express();
const port = process.env.PORT || 3000;

connectMongoDB(); // Conectar a MongoDB

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Hacer que el pool esté disponible para las rutas a través de app.locals
app.locals.pool = pool;

// Rutas
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);
app.use('/api', userRoutes); 
app.use('/api', fraseRoutes); // Agrega la ruta para obtener frases

// Manejo de errores global (opcional, pero recomendado)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
