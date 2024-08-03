// server.js (o tu archivo de servidor)
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import pg from "pg";

const { Client } = pg;

const app = express();
const port = 3001; // Puerto del servidor

app.use(cors());
app.use(bodyParser.json());

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "ECHOMIND",
  password: "1234",
  port: 5432,
});

client.connect();

app.post("/api/lists", async (req, res) => {
  const { userId, name } = req.body;

  try {
    const result = await client.query(
      "INSERT INTO listas (id_usuario, nombre) VALUES ($1, $2) RETURNING *",
      [userId, name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear la lista:", error);
    res.status(500).json({ error: "Error al crear la lista" });
  }
});

app.get("/api/lists/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query("SELECT * FROM listas WHERE id = $1", [
      id,
    ]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Lista no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener la lista:", error);
    res.status(500).json({ error: "Error al obtener la lista" });
  }
});
// Ruta para obtener todas las listas
app.get("/api/lists", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM listas");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener las listas:", error);
    res.status(500).json({ error: "Error al obtener las listas" });
  }
});
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
