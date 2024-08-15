import express from "express";
import { client } from "../config/db.js";

const router = express.Router();

// Obtener todos los usuarios
router.get("/users", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT nombres, apellidos, email, pais_id FROM registro_usuarios"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener los usuarios:", err);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

// Eliminar un usuario por email
router.delete("/users/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const result = await client.query(
      "DELETE FROM registro_usuarios WHERE email = $1",
      [email]
    );
    if (result.rowCount > 0) {
      res.status(204).send(); // Respuesta exitosa sin contenido
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (err) {
    console.error("Error al eliminar el usuario:", err);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
});

// Actualizar un usuario por email
router.put("/users/:email", async (req, res) => {
  const { email } = req.params;
  const { nombres, apellidos, pais_id } = req.body; // Obtener los datos de actualización del cuerpo de la solicitud

  try {
    const result = await client.query(
      `UPDATE registro_usuarios
       SET nombres = $1, apellidos = $2, pais_id = $3
       WHERE email = $4 RETURNING *`,
      [nombres, apellidos, pais_id, email]
    );

    if (result.rowCount > 0) {
      res
        .status(200)
        .json({ message: "Usuario actualizado", user: result.rows[0] });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (err) {
    console.error("Error al actualizar el usuario:", err);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
});

export default router;
