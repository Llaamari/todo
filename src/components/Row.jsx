// Display a single task and provide a button for deleting it
export default function Row({ item, deleteTask }) {
  return (
    <div className="todo-row">
      {/* Display the task description */}
      <span>{item.description}</span>

      {/* Delete this task using its id */}
      <button
        className="delete-button"
        onClick={() => deleteTask(item.id)}
      >
        Delete
      </button>
    </div>
  )
}