import { Router } from 'express'
import { auth } from '../helper/auth.js'
import {
  getTasks,
  createTask,
  deleteTask
} from '../controllers/TaskController.js'

const router = Router()

// Public route for retrieving all tasks
router.get('/', getTasks)

// Protected route for creating a new task
router.post('/', auth, createTask)

// Protected route for deleting a task by its id
router.delete('/:id', auth, deleteTask)

export default router