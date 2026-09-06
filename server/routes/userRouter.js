import { Router } from 'express'
import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool } from '../helper/db.js'

const { sign } = jwt
const router = Router()

// Register a new user
router.post('/signup', async (req, res, next) => {
  try {
    // Read and clean the user's email and password from the request body
    const email = req.body.user?.email?.trim().toLowerCase()
    const password = req.body.user?.password

    // Both email and password are required
    if (!email || !password) {
      const error = new Error('Email and password are required')
      error.status = 400
      return next(error)
    }

    // Hash the password before storing it in the database
    const hashedPassword = await hash(password, 10)

    // Save the new user and return only the id and email
    const result = await pool.query(
      'INSERT INTO account (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    )

    return res.status(201).json(result.rows[0])
  } catch (error) {
    // Forward errors to the common error-handling middleware
    return next(error)
  }
})

// Authenticate an existing user
router.post('/signin', async (req, res, next) => {
  try {
    // Read and clean the login credentials
    const email = req.body.user?.email?.trim().toLowerCase()
    const password = req.body.user?.password

    // Both email and password are required
    if (!email || !password) {
      const error = new Error('Email and password are required')
      error.status = 400
      return next(error)
    }

    // Find the user by email
    const result = await pool.query(
      'SELECT id, email, password FROM account WHERE email = $1',
      [email]
    )

    const dbUser = result.rows[0]

    // Compare the entered password with the stored password hash
    if (!dbUser || !(await compare(password, dbUser.password))) {
      const error = new Error('Invalid email or password')
      error.status = 401
      return next(error)
    }

    // Create a JWT token for the authenticated user
    const token = sign(
      {
        userId: dbUser.id,
        email: dbUser.email
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1h'
      }
    )

    // Return the user information and token to the client
    return res.status(200).json({
      id: dbUser.id,
      email: dbUser.email,
      token
    })
  } catch (error) {
    // Forward errors to the common error-handling middleware
    return next(error)
  }
})

export default router