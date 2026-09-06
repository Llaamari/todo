export default function Row({ item, deleteTask }) {
  return (
    <div className="todo-row">
      <span>{item.description}</span>

      <button
        className="delete-button"
        onClick={() => deleteTask(item.id)}
      >
        Delete
      </button>
    </div>
  )
}