import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js"; // Incluye las rutas relacionadas con usuarios
import fraseRoutes from "./routes/fraseRoutes.js"; // Incluye las rutas relacionadas con frases
import listRoutes from "./routes/listRoutes.js"; // Incluye las rutas relacionadas con listas
import todoRoutes from "./routes/todoRoutes.js"; // Incluye las rutas relacionadas con tareas
import connectMongoDB from "./config/mongodb.js"; // Importa la conexión a MongoDB si la necesitas

const app = express();
const port = process.env.PORT || 3001;

// Conectar a MongoDB
connectMongoDB();

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api", userRoutes); // Rutas relacionadas con usuarios (registro, login, CRUD de usuarios)
app.use("/api", fraseRoutes); // Rutas relacionadas con frases
app.use("/api", listRoutes); // Rutas relacionadas con listas
app.use("/api", todoRoutes); // Rutas relacionadas con tareas

// Manejo de errores global (opcional, pero recomendado)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("¡Algo salió mal!");
});

// Iniciar el servidor en el puerto 3001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
