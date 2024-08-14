import pg from "pg";

const { Client } = pg;

export const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "echomind",
  password: "1234",
  port: 5432,
});
