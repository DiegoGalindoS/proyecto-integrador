import pool from "../config/db.js";

export const createList = async (name) => {
  const query = "INSERT INTO listas (nombre) VALUES ($1) RETURNING *";
  const values = [name];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getListById = async (id) => {
  const query = "SELECT * FROM listas WHERE id = $1";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllLists = async () => {
  const query = "SELECT * FROM listas";
  const result = await pool.query(query);
  return result.rows;
};
