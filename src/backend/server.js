import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import listRoutes from "./routes/listRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", listRoutes);
app.use("/api", todoRoutes);
app.use("/api/users", userRoutes); // Añadir rutas de usuarios

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
