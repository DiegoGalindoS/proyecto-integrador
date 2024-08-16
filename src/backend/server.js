import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import registerRoutes from "./routes/registerRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import fraseRoutes from "./routes/fraseRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import connectMongoDB from "./config/mongodb.js"; // Importa la conexión a MongoDB si la necesitas

const app = express();
const port = process.env.PORT || 3001;
connectMongoDB(); // Conectar a MongoDB
// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Asegúrate de no volver a conectar el cliente aquí, ya está conectado en `db.js`

// Rutas
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api", userRoutes);
app.use("/api", fraseRoutes);

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
