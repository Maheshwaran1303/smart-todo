function TaskFilters({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
}) {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Search Tasks
          </label>

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search by task title..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Filter by Status
          </label>

          <select
            value={statusFilter}
            onChange={(event) =>
              onStatusChange(event.target.value)
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

      </div>
    </section>
  );
}

export default TaskFilters;