import pool from "../config/db.js";

export const createTodo = async (listId, title, description, status) => {
  const query =
    "INSERT INTO todos (list_id, title, description, status) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [listId, title, description, status];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getTodosByListId = async (listId) => {
  const query = "SELECT * FROM todos WHERE list_id = $1";
  const values = [listId];
  const result = await pool.query(query, values);
  return result.rows;
};

export const updateTodo = async (
  id,
  title,
  description,
  status,
  completed_on
) => {
  const query =
    "UPDATE todos SET title = $1, description = $2, status = $3, completed_on = $4 WHERE id = $5 RETURNING *";
  const values = [title, description, status, completed_on, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteTodo = async (id) => {
  const query = "DELETE FROM todos WHERE id = $1";
  const values = [id];
  await pool.query(query, values);
};
