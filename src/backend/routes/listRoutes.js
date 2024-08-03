import express from "express";
import {
  createListHandler,
  getListByIdHandler,
  getAllListsHandler,
} from "../controllers/listController.js";

const router = express.Router();

router.post("/lists", createListHandler);
router.get("/lists/:id", getListByIdHandler);
router.get("/lists", getAllListsHandler);

export default router;
