// routes/userRoutes.js
import express from "express";
import {
  createUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
  getPaises,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser); // Ruta para registrar un nuevo usuario
router.post("/login", loginUser); // Ruta para login de usuario
router.get("/users", getUsers); // Ruta para obtener todos los usuarios
router.put("/users/:email", updateUser); // Ruta para actualizar un usuario por email
router.delete("/users/:email", deleteUser); // Ruta para eliminar un usuario por email
router.get("/paises", getPaises);
export default router;
