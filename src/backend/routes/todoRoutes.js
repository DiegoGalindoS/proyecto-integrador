import express from "express";
import {
  createTodoHandler,
  getTodosByListIdHandler,
  updateTodoHandler,
  deleteTodoHandler,
} from "../controllers/todoController.js";

const router = express.Router();

router.post("/lists/:listId/todos", createTodoHandler);
router.get("/lists/:listId/todos", getTodosByListIdHandler);
router.put("/todos/:todoId", updateTodoHandler);
router.delete("/todos/:todoId", deleteTodoHandler);

export default router;
