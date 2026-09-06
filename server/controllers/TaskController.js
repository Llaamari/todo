import {
  selectAllTasks,
  insertTask,
  deleteTaskById
} from '../models/Task.js'
import { ApiError } from '../helper/ApiError.js'

// Controller handles HTTP requests, validation and responses for tasks.

// Get all tasks using the Task model
const getTasks = async (req, res, next) => {
  try {
    const result = await selectAllTasks()

    // Return the tasks as JSON
    return res.status(200).json(result.rows || [])
  } catch (error) {
    // Forward errors to the common error-handling middleware
    return next(error)
  }
}

// Validate and create a new task
const createTask = async (req, res, next) => {
  try {
    // Read and clean the task description from the request body
    const description = req.body.task?.description?.trim()

    // A task cannot be created without a description
    if (!description) {
      return next(
        new ApiError('Task description is required', 400)
      )
    }

    // Save the task using the Task model
    const result = await insertTask(description)

    // Return the created task with HTTP status 201
    return res.status(201).json(result.rows[0])
  } catch (error) {
    return next(error)
  }
}

// Delete a task using the id received from the URL
const deleteTask = async (req, res, next) => {
  try {
    const result = await deleteTaskById(req.params.id)

    // Return the deleted task
    return res.status(200).json(result.rows[0])
  } catch (error) {
    return next(error)
  }
}

// Export controller functions for the task router
export {
  getTasks,
  createTask,
  deleteTask
}