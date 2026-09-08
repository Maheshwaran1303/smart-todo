const API_URL = "http://127.0.0.1:8000/api/tasks";

async function handleResponse(response) {
  let data = null;

  if (response.status !== 204) {
    data = await response.json();
  }

  if (!response.ok) {
    const message =
      data?.title?.[0] ||
      data?.detail ||
      "Something went wrong.";

    throw new Error(message);
  }

  return data;
}

export async function getTasks() {
  const response = await fetch(`${API_URL}/`);

  return handleResponse(response);
}

export async function createTask(taskData) {
  const response = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  return handleResponse(response);
}

export async function updateTask(taskId, taskData) {
  const response = await fetch(`${API_URL}/${taskId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  return handleResponse(response);
}

export async function deleteTask(taskId) {
  const response = await fetch(`${API_URL}/${taskId}/`, {
    method: "DELETE",
  });

  return handleResponse(response);
}