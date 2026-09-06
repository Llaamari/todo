import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Row from './components/Row'
import { useUser } from './context/useUser'

// Backend API address from the frontend environment variables
const apiUrl = import.meta.env.VITE_API_URL

function App() {
  // Store the current input value and the list of tasks
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  // Get the authenticated user and JWT token from the user context
  const { user } = useUser()

  // Load all tasks from the backend when the component is first rendered
  useEffect(() => {
    axios.get(`${apiUrl}/tasks`)
      .then(response => {
        setTasks(response.data)
      })
      .catch(error => {
        alert(error.response.data ? error.response.data.message : error)
      })
  }, [])

  // Create a new task
  const addTask = (e) => {
    e.preventDefault()

    // Send the JWT token with the protected request
    const headers = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }

    const newTask = { description: task }

    axios.post(
      `${apiUrl}/tasks`,
      { task: newTask },
      headers
    )
      .then(response => {
        // Add the created task to the current task list
        setTasks(currentTasks => [...currentTasks, response.data])

        // Clear the input field after a successful request
        setTask('')
      })
      .catch(error => {
        alert(error.response ? error.response.data.error.message : error)
      })
  }

  // Delete a task by its id
  const deleteTask = (deleted) => {
    // Send the JWT token with the protected request
    const headers = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }

    axios.delete(
      `${apiUrl}/tasks/${deleted}`,
      headers
    )
      .then(() => {
        // Remove the deleted task from the local state
        setTasks(currentTasks =>
          currentTasks.filter(item => item.id !== deleted)
        )
      })
      .catch(error => {
        alert(error.response ? error.response.data.error.message : error)
      })
  }

  return (
    <div className="todo-card">
      <h1>Todo</h1>

      {/* Form for adding a new task */}
      <form className="todo-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a new task"
          value={task}
          onChange={e => setTask(e.target.value)}
        />

        <button type="submit">
          Add
        </button>
      </form>

      {/* Render each task using the Row component */}
      <div className="todo-list">
        {tasks.map(item => (
          <Row
            key={item.id}
            item={item}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  )
}

export default App