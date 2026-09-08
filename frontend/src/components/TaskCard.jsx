function TaskCard({
  task,
  onDelete,
  onEdit,
  onStatusChange,
}) {
  const priorityStyles = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
  };

  const statusStyles = {
    pending: "bg-gray-100 text-gray-700",
    in_progress: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
  };

  const statusLabels = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
  };

  const isCompleted = task.status === "completed";

  return (
    <article
      className={`rounded-xl bg-white p-5 shadow-sm transition ${
        isCompleted ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">
          <h3
            className={`text-lg font-semibold ${
              isCompleted
                ? "text-gray-500 line-through"
                : "text-gray-900"
            }`}
          >
            {task.title}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Due: {task.due_date || "No due date"}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            priorityStyles[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

        <button
          type="button"
          onClick={() => onStatusChange(task)}
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            statusStyles[task.status]
          }`}
        >
          {statusLabels[task.status]}
        </button>

        <div className="flex gap-2">

          <button
            type="button"
            onClick={() => onEdit(task)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>
      </div>
    </article>
  );
}

export default TaskCard;