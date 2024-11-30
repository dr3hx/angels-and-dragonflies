import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Initialize the connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
});

// Create the database instance with our schema
export const db = drizzle(pool, { schema });

// Export a function to get the raw pool for direct queries if needed
export const getPool = () => pool;

// Helper function to ensure database connection
export async function checkDatabaseConnection() {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Graceful shutdown helper
export async function closeDatabaseConnection() {
  try {
    await pool.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
}

// Type-safe query helpers
export type DbSchema = typeof schema;
export type DbClient = typeof db;

// Re-export schema for convenience
export * from './schema';
