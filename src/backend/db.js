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
  database: "echomind",
  password: "123456",
  port: 5432,
});

client.connect();

// Create a list without user association
app.post("/api/lists", async (req, res) => {
  const { name } = req.body; // No userId needed

  try {
    const result = await client.query(
      "INSERT INTO listas (nombre) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear la lista:", error);
    res.status(500).json({ error: "Error al crear la lista" });
  }
});

// Get a specific list by ID
app.get("/api/lists/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query("SELECT * FROM listas WHERE id = $1", [id]);
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

// Get all lists
app.get("/api/lists", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM listas");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener las listas:", error);
    res.status(500).json({ error: "Error al obtener las listas" });
  }
});

// Create a todo within a list
app.post("/api/lists/:listId/todos", async (req, res) => {
  const { listId } = req.params;
  const { title, description, status } = req.body;

  try {
    const result = await client.query(
      "INSERT INTO todos (list_id, title, description, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [listId, title, description, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Error creating todo" });
  }
});

// Get todos for a specific list
app.get("/api/lists/:listId/todos", async (req, res) => {
  const { listId } = req.params;

  try {
    const result = await client.query("SELECT * FROM todos WHERE list_id = $1", [listId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Error fetching todos" });
  }
});

// Update a todo
app.put("/api/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const { title, description, status, completed_on } = req.body;

  try {
    const result = await client.query(
      "UPDATE todos SET title = $1, description = $2, status = $3, completed_on = $4 WHERE id = $5 RETURNING *",
      [title, description, status, completed_on, todoId]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Error updating todo" });
  }
});

// Delete a todo
app.delete("/api/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;

  try {
    await client.query("DELETE FROM todos WHERE id = $1", [todoId]);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Error deleting todo" });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

