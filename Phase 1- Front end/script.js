// script.js
const todoInput = document.getElementById("todo-text");
const addButton = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");
const completedCount = document.getElementById("completed-count");
const totalCount = document.getElementById("total-count");

let completedTasks = 0;
let totalTasks = 0;

addButton.addEventListener("click", () => {
  const todoText = todoInput.value.trim();
  if (todoText === "") {
    alert("Please enter a task.");
    return;
  }

  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");

  const todoTextSpan = document.createElement("span");
  todoTextSpan.classList.add("todo-text");
  todoTextSpan.textContent = todoText;

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("todo-buttons");

  const completeButton = document.createElement("button");
  completeButton.classList.add("complete-btn");
  completeButton.innerHTML = "✔️";
  completeButton.addEventListener("click", () => {
    todoItem.classList.toggle("completed");
    if (todoItem.classList.contains("completed")) {
      completedTasks++;
    } else {
      completedTasks--;
    }
    updateCounts();
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.innerHTML = "🗑️";
  deleteButton.addEventListener("click", () => {
    if (todoItem.classList.contains("completed")) {
      completedTasks--;
    }
    totalTasks--;
    todoItem.remove();
    updateCounts();
  });

  buttonContainer.appendChild(completeButton);
  buttonContainer.appendChild(deleteButton);

  todoItem.appendChild(todoTextSpan);
  todoItem.appendChild(buttonContainer);
  todoList.appendChild(todoItem);

  todoInput.value = "";
  totalTasks++;
  updateCounts();
});

function updateCounts() {
  completedCount.textContent = completedTasks;
  totalCount.textContent = totalTasks;
}
