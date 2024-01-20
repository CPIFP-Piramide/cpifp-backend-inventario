import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const dbHost = process.env.POSTGRES_HOST;
const dbUser = process.env.POSTGRES_USER;
const dbPassword = process.env.POSTGRES_PASSWORD;
const dbName = process.env.POSTGRES_DB;

const pool = new Pool({
  max: 20,
  connectionString: `postgres://${dbUser}:${dbPassword}@${dbHost}:5432/${dbName}`,
  idleTimeoutMillis: 30000,
});

const executeQuery = async (sql: string, data?: any[]) => {
  const client = await pool.connect();
  let results: any[] = [];
  try {
    const { rows } = await client.query(sql, data);
    results = rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
    return results;
  }
};

export default executeQuery;
