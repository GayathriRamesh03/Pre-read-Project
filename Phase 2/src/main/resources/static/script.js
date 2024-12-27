//script.js
const API_BASE_URL = "http://localhost:8080/api/tasks";

function addTaskToUI(task) {
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");
  todoItem.dataset.id = task.id;

  const todoTextSpan = document.createElement("span");
  todoTextSpan.classList.add("todo-text");
  todoTextSpan.textContent = task.title;

  if (task.completed) {
    todoItem.classList.add("completed");
  }

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("todo-buttons");

  const completeButton = document.createElement("button");
  completeButton.classList.add("complete-btn");
  completeButton.innerHTML = "✔️";
  completeButton.addEventListener("click", () => {
    const newCompletionStatus = !task.completed; // Toggle completion
    fetch(`${API_BASE_URL}/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: task.title, completed: newCompletionStatus }),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        task.completed = updatedTask.completed; // Update local task object
        todoItem.classList.toggle("completed", updatedTask.completed);
        updateCounts(); // Recalculate counts
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        alert("An error occurred while updating the task status.");
      });
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.innerHTML = "🗑️";
  deleteButton.addEventListener("click", () => {
    fetch(`${API_BASE_URL}/${task.id}`, {
      method: "DELETE",
    })
      .then(() => {
        todoItem.remove();
        updateCounts();
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        alert("An error occurred while deleting the task.");
      });
  });

  buttonContainer.appendChild(completeButton);
  buttonContainer.appendChild(deleteButton);

  todoItem.appendChild(todoTextSpan);
  todoItem.appendChild(buttonContainer);
  document.getElementById("todo-list").appendChild(todoItem);
}

document.getElementById("add-todo").addEventListener("click", () => {
  const todoInput = document.getElementById("todo-text");
  const todoText = todoInput.value.trim();
  if (todoText === "") {
    alert("Please enter a task.");
    return;
  }

  // Send the new task to the backend
  fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: todoText, completed: false }),
  })
    .then((response) => response.json())
    .then((newTask) => {
      addTaskToUI(newTask); // Add task to UI only once backend confirms success
      updateCounts(); // Update counts after UI is updated
    })
    .catch((error) => {
      console.error("Error adding task:", error);
      alert("An error occurred while adding the task.");
    });

  todoInput.value = ""; // Clear the input field
});

// Update task counts based on UI
function updateCounts() {
  const completedCount = document.querySelectorAll(".todo-item.completed").length;
  const totalCount = document.querySelectorAll(".todo-item").length;

  document.getElementById("completed-count").textContent = completedCount;
  document.getElementById("total-count").textContent = totalCount;
}

// Fetch tasks from backend and populate UI
function fetchTasks() {
  fetch(API_BASE_URL)
    .then((response) => response.json())
    .then((tasks) => {
      tasks.forEach(addTaskToUI); // Populate tasks in the UI
      updateCounts(); // Update counts after fetching tasks
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
      alert("An error occurred while fetching tasks.");
    });
}

fetchTasks();
