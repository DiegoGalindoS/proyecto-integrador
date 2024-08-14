import express from "express";
import * as ListController from "../controllers/listController.js";

const router = express.Router();

router.post("/lists", ListController.createList);
router.get("/lists/:id", ListController.getListById);
router.get("/lists", ListController.getAllLists);

export default router;
