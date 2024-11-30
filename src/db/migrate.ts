import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, checkDatabaseConnection, closeDatabaseConnection } from './index';

// Main migration function
async function runMigrations() {
  try {
    // Check database connection first
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      throw new Error('Cannot run migrations: Database connection failed');
    }

    console.log('Starting database migrations...');
    
    // Run migrations
    await migrate(db, {
      migrationsFolder: 'src/db/migrations',
    });

    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    // Always close the connection when done
    await closeDatabaseConnection();
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations();
}

// Export for programmatic use
export { runMigrations };
