import { useState } from "react";
import { createTask } from "../services/taskService";

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (event) => {
  event.preventDefault();

  setError("");

  if (!title.trim()) {
    setError("Task title is required.");
    return;
  }

  const taskData = {
    title: title.trim(),
    priority,
    due_date: dueDate || null,
    status: "pending",
  };

  try {
    setIsSubmitting(true);

    const createdTask = await createTask(taskData);

    onTaskCreated(createdTask);

    setTitle("");
    setPriority("medium");
    setDueDate("");
  } catch (error) {
    setError(error.message);
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        Add New Task
      </h2>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Task Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setError("");
            }}
            placeholder="Enter your task"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
          />

          {error && (
            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Priority
          </label>

          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Due Date
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Task"}
        </button>

      </form>
    </section>
  );
}

export default TaskForm;