import {
  createTodo,
  getTodosByListId,
  updateTodo,
  deleteTodo,
} from "../../../models/todoModel.js";

export const createTodoHandler = async (req, res) => {
  const { listId } = req.params;
  const { title, description, status } = req.body;

  try {
    const newTodo = await createTodo(listId, title, description, status);
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Error creating todo" });
  }
};

export const getTodosByListIdHandler = async (req, res) => {
  const { listId } = req.params;

  try {
    const todos = await getTodosByListId(listId);
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Error fetching todos" });
  }
};

export const updateTodoHandler = async (req, res) => {
  const { todoId } = req.params;
  const { title, description, status, completed_on } = req.body;

  try {
    const updatedTodo = await updateTodo(
      todoId,
      title,
      description,
      status,
      completed_on
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Error updating todo" });
  }
};

export const deleteTodoHandler = async (req, res) => {
  const { todoId } = req.params;

  try {
    await deleteTodo(todoId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Error deleting todo" });
  }
};
