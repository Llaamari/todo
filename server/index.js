import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import todoRouter from './routes/todoRouter.js'
import userRouter from './routes/userRouter.js'

const port = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())

app.use('/tasks', todoRouter)
app.use('/users', userRouter)

app.use((err, req, res, next) => {
  const statusCode = err.status || 500

  res.status(statusCode).json({
    error: {
      message: err.message,
      status: statusCode
    }
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})