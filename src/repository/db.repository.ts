import pg from 'pg'
const { Pool } = pg
import { config } from "~/config";

const pool = new Pool({
  host: config.POSTGRES_HOST,
  user: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  port: config.POSTGRES_PORT,
  idleTimeoutMillis: 30000,
});

export default pool;

