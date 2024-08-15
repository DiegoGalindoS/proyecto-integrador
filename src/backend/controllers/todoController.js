import * as TodoModel from "../models/todoModel.js";

export const createTodo = async (req, res) => {
  const { listId } = req.params;
  const { title, description, status } = req.body;
  try {
    const todo = await TodoModel.createTodo(listId, title, description, status);
    res.status(201).json(todo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Error creating todo" });
  }
};

export const getTodosByListId = async (req, res) => {
  const { listId } = req.params;
  try {
    const todos = await TodoModel.getTodosByListId(listId);
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Error fetching todos" });
  }
};

export const updateTodo = async (req, res) => {
  console.log("Request Params:", req.params); // Debería mostrar { todoId: 'valor' }

  const { todoId } = req.params;
  const { title, description, status, completed_on } = req.body;

  try {
    const todo = await TodoModel.updateTodo(
      todoId,
      title,
      description,
      status,
      completed_on
    );
    res.status(200).json(todo); // Responde con el objeto actualizado
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Error updating todo" }); // Manejo de errores
  }
};

export const deleteTodo = async (req, res) => {
  const { todoId } = req.params;
  try {
    await TodoModel.deleteTodo(todoId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Error deleting todo" });
  }
};
