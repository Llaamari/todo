import pkg from 'pg'
import 'dotenv/config'

// Use development environment by default
const environment = process.env.NODE_ENV || 'development'

const { Pool } = pkg

// Create a PostgreSQL connection pool using environment variables
const openDb = () => {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,

    // Use the development database normally
    // and a separate test database when running tests
    database:
      environment === 'development'
        ? process.env.DB_NAME
        : process.env.TEST_DB_NAME,

    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  })

  return pool
}

// Create one shared database connection pool for the application
const pool = openDb()

export { pool }