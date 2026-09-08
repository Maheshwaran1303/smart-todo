import { useEffect, useState } from "react";

function EditTaskForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
      setDueDate(task.due_date || "");
      setStatus(task.status);
    }
  }, [task]);

const handleSubmit = async (event) => {
  event.preventDefault();

  setError("");

  if (!title.trim()) {
    setError("Task title is required.");
    return;
  }

  try {
    setIsSaving(true);

    await onSave({
      title: title.trim(),
      priority,
      due_date: dueDate || null,
      status,
    });
  } catch (error) {
    setError(error.message);
  } finally {
    setIsSaving(false);
  }
};

const handleSaveEdit = async (taskData) => {
  try {
    const updatedTask = await updateTask(
      editingTask.id,
      taskData
    );

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === editingTask.id
          ? updatedTask
          : task
      )
    );

    setEditingTask(null);
  } catch (error) {
    throw error;
  }
};


  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        Edit Task
      </h2>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Task Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
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

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Status
          </label>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex gap-3">
            <button
                type="submit"
                disabled={isSaving}
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                {isSaving ? "Saving..." : "Save Changes"}
            </button>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>

      </form>
    </section>
  );
}

export default EditTaskForm;