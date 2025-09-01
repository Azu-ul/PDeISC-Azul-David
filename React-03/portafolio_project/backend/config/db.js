import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test connection
pool.query('SELECT NOW()')
  .then(() => console.log('Conectado a la base de datos PostgreSQL'))
  .catch(err => console.error('Error al conectar a la base de datos PostgreSQL:', err.stack));

export default pool;