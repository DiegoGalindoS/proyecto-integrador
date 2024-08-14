import { client } from "../config/db.js";

export const createList = async (name) => {
  const result = await client.query(
    "INSERT INTO listas (nombre) VALUES ($1) RETURNING *",
    [name]
  );
  return result.rows[0];
};

export const getListById = async (id) => {
  const result = await client.query("SELECT * FROM listas WHERE id = $1", [id]);
  return result.rows[0];
};

export const getAllLists = async () => {
  const result = await client.query("SELECT * FROM listas");
  return result.rows;
};
