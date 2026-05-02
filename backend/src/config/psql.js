import { Pool } from "pg";

export const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'RIFA',
  database: 'fundo',
  port: 5432,

  max: 10,                // max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});