import { pool } from '../helper/db.js'

// Model handles all database operations related to tasks.

// Get all tasks from the database
const selectAllTasks = async () => {
  return await pool.query('SELECT * FROM task')
}

// Insert a new task into the database and return the created task
const insertTask = async (description) => {
  return await pool.query(
    'INSERT INTO task (description) VALUES ($1) RETURNING *',
    [description]
  )
}

// Delete a task by its id and return the deleted task
const deleteTaskById = async (id) => {
  return await pool.query(
    'DELETE FROM task WHERE id = $1 RETURNING *',
    [id]
  )
}

// Export database functions for the controller
export {
  selectAllTasks,
  insertTask,
  deleteTaskById
}