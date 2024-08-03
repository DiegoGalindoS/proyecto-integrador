import express from "express";
import {
  handleCreateUser,
  handleLoginUser,
} from "../controllers/userController.js";

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post("/register", handleCreateUser);

// Ruta para iniciar sesión
router.post("/login", handleLoginUser);

export default router;
