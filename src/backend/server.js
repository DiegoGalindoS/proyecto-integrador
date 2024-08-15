import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import registerRoutes from "./routes/registerRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import listRoutes from "./routes/listRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import { client } from "./config/db.js";

const app = express();
const port = process.env.PORT || 3001;

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Asegúrate de no volver a conectar el cliente aquí, ya está conectado en `db.js`

// Rutas
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api", userRoutes);

app.use("/api", listRoutes);
app.use("/api", todoRoutes);

// Manejo de errores global (opcional, pero recomendado)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("¡Algo salió mal!");
});

// Iniciar el servidor en el puerto 3001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
