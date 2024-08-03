import {
  crearUsuario,
  encontrarUsuarioPorCredenciales,
} from "../models/userModel.js";

// Controlador para crear un nuevo usuario
export const handleCreateUser = async (req, res) => {
  const { nombres, apellidos, genero, email, password } = req.body;

  if (!nombres || !apellidos || !genero || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    const nuevoUsuario = await crearUsuario(
      nombres,
      apellidos,
      genero,
      email,
      password
    );
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

// Controlador para iniciar sesión
export const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }

  try {
    const usuario = await encontrarUsuarioPorCredenciales(email, password);
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
