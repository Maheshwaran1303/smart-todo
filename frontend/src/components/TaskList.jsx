import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  onDelete,
  onEdit,
  onStatusChange,
}) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          My Tasks
        </h2>

        <p className="text-sm text-gray-500">
          {tasks.length} task{tasks.length !== 1 ? "s" : ""}
        </p>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <div className="text-4xl">📝</div>

          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            No tasks found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskList;