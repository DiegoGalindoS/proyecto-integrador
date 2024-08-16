import express from "express";
import Frase from "../models/FraseModel.js";

const router = express.Router();

// Ruta para obtener todas las frases
router.get("/frases", async (req, res) => {
  try {
    const frases = await Frase.find();
    res.json(frases);
  } catch (error) {
    console.error("Error al obtener las frases:", error);
    res.status(500).json({ error: "Error al obtener las frases" });
  }
});

export default router;
