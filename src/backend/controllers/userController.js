// controllers/userController.js
import {
  crearUsuario,
  encontrarUsuarioPorCredenciales,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
  obtenerPaises,
} from "../models/userModel.js";
import { client } from "../config/db.js"; // Asegúrate de que esta ruta sea correcta

export const createUser = async (req, res) => {
  const {
    nombres,
    apellidos,
    genero,
    email,
    password,
    confirmar_password,
    pais_id,
  } = req.body;

  try {
    const usuario = await crearUsuario(
      nombres,
      apellidos,
      genero,
      email,
      password,
      confirmar_password,
      pais_id
    );
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(`Intentando iniciar sesión con email: ${email}`);
    const usuario = await encontrarUsuarioPorCredenciales(email, password);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      console.log("Credenciales incorrectas para email:", email);
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error("Error durante la autenticación:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const usuarios = await obtenerUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { email } = req.params;
  const { nombres, apellidos, genero, pais_id } = req.body;

  try {
    const usuarioActualizado = await actualizarUsuario(
      email,
      nombres,
      apellidos,
      genero,
      pais_id
    );
    if (usuarioActualizado) {
      res.status(200).json(usuarioActualizado);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { email } = req.params;

  try {
    const usuarioEliminado = await eliminarUsuario(email);
    if (usuarioEliminado) {
      res.status(200).json(usuarioEliminado);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPaises = async (req, res) => {
  try {
    const paises = await obtenerPaises();
    res.json(paises);
  } catch (error) {
    console.error("Error al obtener la lista de países:", error);
    res.status(500).send("Error al obtener la lista de países");
  }
};
