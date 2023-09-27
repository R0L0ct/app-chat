import pkg from "pg";
const { Pool } = pkg;

let pool;

if (!pool) {
  pool = new Pool({
    user: "rolo",
    password: "admin123",
    host: "localhost",
    port: 5433,
    database: "rolo",
  });
}
export { pool };
