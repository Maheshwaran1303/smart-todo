import { useEffect, useState } from "react";

import Header from "./components/Header";
import TaskFilters from "./components/TaskFilters";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks, deleteTask, updateTask } from "./services/taskService";
import EditTaskForm from "./components/EditTaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    getTasks()
      .then((data) => {
        console.log("Tasks from Django:", data);
        setTasks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleTaskCreated = (createdTask) => {
    setTasks((previousTasks) => [
      createdTask,
      ...previousTasks,
    ]);
  };

const handleDelete = async (taskId) => {
  try {
    await deleteTask(taskId);

    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => task.id !== taskId
      )
    );
  } catch (error) {
    console.error(error);
  }
};

const handleEdit = (task) => {
  setEditingTask(task);
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
    console.error(error);
  }
};

const handleStatusChange = async (task) => {
  const newStatus =
    task.status === "completed"
      ? "pending"
      : "completed";

  try {
    const updatedTask = await updateTask(task.id, {
      status: newStatus,
    });

    setTasks((previousTasks) =>
      previousTasks.map((currentTask) =>
        currentTask.id === task.id
          ? updatedTask
          : currentTask
      )
    );
  } catch (error) {
    console.error(error);
  }
};

const filteredTasks = tasks.filter((task) => {
  const matchesSearch = task.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "all" ||
    task.status === statusFilter;

  return matchesSearch && matchesStatus;
});


  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <TaskFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {editingTask ? (
            <EditTaskForm
              task={editingTask}
              onSave={handleSaveEdit}
              onCancel={() => setEditingTask(null)}
            />
          ) : (
            <TaskForm onTaskCreated={handleTaskCreated} />
          )}

          <TaskList 
            tasks={filteredTasks} 
            onDelete={handleDelete} 
            onEdit={handleEdit}
            onStatusChange={handleStatusChange}
          />
        </div>
      </main>
    </div>
  );
}

export default App;