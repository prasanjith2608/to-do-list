export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-xl shadow-md cursor-pointer ${
        task.completed ? "bg-green-100" : "bg-white"
      }`}
    >
      <span
        onClick={onToggle}
        className={`text-lg ${
          task.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {task.completed ? "✅" : "🟩"} {task.title}
      </span>

      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 text-xl"
        title="Delete Task"
      >
        🗑️
      </button>
    </div>
  );
}

