import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
const username = localStorage.getItem("username");


export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch tasks from backend
  const loadTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        headers: { Authorization: token },
      });
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      alert("❌ Failed to load tasks");
    }
  };

  useEffect(() => {
    if (token) loadTasks();
    else alert("🔒 Please log in first");
  }, []);

  // Add task
  const addTask = async (newTitle) => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ title: newTitle }),
      });
      const data = await res.json();
      setTasks([...tasks, data]);
    } catch (err) {
      alert("❌ Failed to add task");
    }
  };

  // Toggle complete
  const toggleComplete = async (id) => {
    const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: { Authorization: token },
    });
    const updated = await res.json();
    setTasks(tasks.map((t) => (t._id === id ? updated : t)));
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    setTasks(tasks.filter((t) => t._id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">📝 To-Do Dashboard</h1>
      <h2 className="text-xl font-medium text-gray-700 mb-2">
  👋 Welcome, {username}!
      </h2>

      <TaskForm onAdd={addTask} />
      <div className="mt-4 space-y-2">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onToggle={() => toggleComplete(task._id)}
            onDelete={() => deleteTask(task._id)}
          />
        ))}
      </div>
    </div>
  );
}
