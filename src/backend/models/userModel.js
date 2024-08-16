// models/userModel.js
import crypto from "crypto";
import { client } from "../config/db.js";

// Función para encriptar la contraseña
const encriptarPassword = (password) => {
  const algoritmo = "aes-256-cbc";
  const clave = Buffer.from(
    "e1d92c3f8b9e6eaa64d96c5c8b33a2d8e51eae8d4d5c7453f43f7c3e6e5b8d79",
    "hex"
  );
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algoritmo, clave, iv);
  let encriptado = cipher.update(password, "utf8", "hex");
  encriptado += cipher.final("hex");

  return `${iv.toString("hex")}:${encriptado}`;
};

// Función para desencriptar la contraseña
const desencriptarPassword = (encriptado) => {
  const [ivHex, contenidoEncriptado] = encriptado.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const clave = Buffer.from(
    "e1d92c3f8b9e6eaa64d96c5c8b33a2d8e51eae8d4d5c7453f43f7c3e6e5b8d79",
    "hex"
  );
  const algoritmo = "aes-256-cbc";

  const decipher = crypto.createDecipheriv(algoritmo, clave, iv);
  let desencriptado = decipher.update(contenidoEncriptado, "hex", "utf8");
  desencriptado += decipher.final("utf8");

  return desencriptado;
};

// Crear un nuevo usuario
export const crearUsuario = async (
  nombres,
  apellidos,
  genero,
  email,
  password,
  confirmar_password,
  pais_id
) => {
  if (
    !nombres ||
    !apellidos ||
    !genero ||
    !email ||
    !password ||
    !pais_id ||
    !confirmar_password
  ) {
    throw new Error("Todos los campos son requeridos");
  }

  try {
    const passwordEncriptada = encriptarPassword(password);

    const query =
      "INSERT INTO registro_usuarios (nombres, apellidos, genero, email, password, confirmar_password, pais_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const values = [
      nombres,
      apellidos,
      genero,
      email,
      passwordEncriptada,
      confirmar_password,
      pais_id,
    ];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw new Error("Error al crear usuario");
  }
};

// Encontrar un usuario por email y contraseña
export const encontrarUsuarioPorCredenciales = async (email, password) => {
  try {
    console.log(`Buscando usuario con email: ${email}`);

    const query = "SELECT * FROM registro_usuarios WHERE email = $1";
    const values = [email];
    const result = await client.query(query, values);
    const usuario = result.rows[0];

    if (!usuario) {
      console.log("Usuario no encontrado");
      return null;
    }

    console.log("Usuario encontrado:", usuario);

    const passwordDesencriptada = desencriptarPassword(usuario.password);

    console.log("Contraseña desencriptada:", passwordDesencriptada);

    if (password === passwordDesencriptada) {
      console.log("Contraseña correcta");
      return usuario;
    } else {
      console.log("Contraseña incorrecta");
      return null;
    }
  } catch (error) {
    console.error("Error al encontrar usuario:", error);
    throw new Error("Error al encontrar usuario");
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  try {
    const query = "SELECT * FROM registro_usuarios";
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw new Error("Error al obtener usuarios");
  }
};

// Actualizar un usuario por email
export const actualizarUsuario = async (
  email,
  nombres,
  apellidos,
  genero,
  pais_id
) => {
  try {
    const query =
      "UPDATE registro_usuarios SET nombres = $1, apellidos = $2, genero = $3, pais_id = $4 WHERE email = $5 RETURNING *";
    const values = [nombres, apellidos, genero, pais_id, email];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw new Error("Error al actualizar usuario");
  }
};

// Eliminar un usuario por email
export const eliminarUsuario = async (email) => {
  try {
    const query = "DELETE FROM registro_usuarios WHERE email = $1 RETURNING *";
    const values = [email];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw new Error("Error al eliminar usuario");
  }
};

export const obtenerPaises = async () => {
  try {
    const result = await client.query("SELECT * FROM paises");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener la lista de países:", error);
    throw error;
  }
};
