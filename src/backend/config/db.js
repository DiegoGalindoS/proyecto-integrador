import pg from "pg";
const { Client } = pg;

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "echomindd",
  password: "1234",
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Conectado a la base de datos PostgreSQL"))
  .catch((err) => console.error("Error al conectar a la base de datos", err));

export { client };
