import { client } from "../config/db.js";

export const getUsers = async (req, res) => {
  const query =
    "SELECT nombres, apellidos, email, pais_id FROM registro_usuarios";

  try {
    const result = await client.query(query);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No se encontraron usuarios" });
    }
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener los usuarios", err);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Controlador para actualizar el usuario
export const updateUser = async (req, res) => {
  const { email } = req.params; // Obtener el email del parámetro
  const { nombres, apellidos, pais_id } = req.body; // Obtener los nuevos datos del cuerpo de la solicitud

  try {
    const result = await client.query(
      `UPDATE registro_usuarios
       SET nombres = $1, apellidos = $2, pais_id = $3
       WHERE email = $4 RETURNING *`,
      [nombres, apellidos, pais_id, email]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario actualizado", user: result.rows[0] });
  } catch (err) {
    console.error("Error al actualizar el usuario:", err);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};
