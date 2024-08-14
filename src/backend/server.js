import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import listRoutes from "./routes/listRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import { client } from "./config/db.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
client
  .connect()
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => console.error("Error al conectar a la base de datos", err));

// Rutas
app.use("/api", listRoutes);
app.use("/api", todoRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
