import express from "express";
import * as TodoController from "../controllers/todoController.js";

const router = express.Router();

router.post("/lists/:listId/todos", TodoController.createTodo);
router.get("/lists/:listId/todos", TodoController.getTodosByListId);
router.put("/todos/:todoId", TodoController.updateTodo);
router.delete("/todos/:todoId", TodoController.deleteTodo);

export default router;
