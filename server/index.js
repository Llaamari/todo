import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import todoRouter from './routes/todoRouter.js'
import userRouter from './routes/userRouter.js'

// Use the port from environment variables or 3001 by default
const port = process.env.PORT || 3001

// Create the Express application
const app = express()

// Allow requests from the frontend
app.use(cors())

// Parse incoming JSON request bodies
app.use(express.json())

// Connect task and user routes to the application
app.use('/tasks', todoRouter)
app.use('/users', userRouter)

// Common error-handling middleware
app.use((err, req, res, next) => {
  // Use the error status code or 500 for unexpected server errors
  const statusCode = err.status || 500

  // Return errors to the client in a consistent JSON format
  res.status(statusCode).json({
    error: {
      message: err.message,
      status: statusCode
    }
  })
})

// Start the backend server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})