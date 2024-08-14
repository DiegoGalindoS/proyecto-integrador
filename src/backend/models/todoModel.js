import { client } from "../config/db.js";

export const createTodo = async (listId, title, description, status) => {
  const result = await client.query(
    "INSERT INTO todos (list_id, title, description, status) VALUES ($1, $2, $3, $4) RETURNING *",
    [listId, title, description, status]
  );
  return result.rows[0];
};

export const getTodosByListId = async (listId) => {
  const result = await client.query("SELECT * FROM todos WHERE list_id = $1", [
    listId,
  ]);
  return result.rows;
};

export const updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const { title, description, status, completed_on } = req.body;

  try {
    const result = await client.query(
      "UPDATE todos SET title = $1, description = $2, status = $3, completed_on = $4 WHERE id = $5 RETURNING *",
      [title, description, status, completed_on, todoId]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Error updating todo" });
  }
};

export const deleteTodo = async (todoId) => {
  await client.query("DELETE FROM todos WHERE id = $1", [todoId]);
};
