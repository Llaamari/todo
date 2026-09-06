import fs from 'fs/promises'
import path from 'path'
import { pool } from './db.js'
import { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

const __dirname = import.meta.dirname

// Helper functions used by the automated backend tests.

// Reset and initialize the test database using db.sql
const initializeTestDb = async () => {
  // Read the SQL file containing the database structure and initial data
  const sql = await fs.readFile(
    path.resolve(__dirname, '../db.sql'),
    'utf8'
  )

  // Execute the SQL statements in the test database
  await pool.query(sql)
}

// Insert a user that can be used in authentication tests
const insertTestUser = async (user) => {
  // Hash the password in the same way as during normal user registration
  const hashedPassword = await hash(user.password, 10)

  await pool.query(
    'INSERT INTO account (email, password) VALUES ($1, $2)',
    [user.email.toLowerCase(), hashedPassword]
  )
}

// Create a JWT token for testing protected API routes
const getToken = (email) => {
  return jwt.sign(
    { email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1h' }
  )
}

export {
  initializeTestDb,
  insertTestUser,
  getToken
}