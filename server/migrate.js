const migrate =  require("postgres-migrations")
require('dotenv').config()

var runMigrations = async function() {
    const dbConfig = {
      database: process.env.DATABASE,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT,10),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
  
      ensureDatabaseExists: true,
      defaultDatabase: process.env.DATABASE
    }

    await migrate.migrate(dbConfig, "./migrations");
}

runMigrations();