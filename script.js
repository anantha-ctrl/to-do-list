const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `list-group-item d-flex justify-content-between align-items-center priority-${task.priority} task-enter`;
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div>
        <strong>[${task.priority}]</strong> ${task.text}
      </div>
      <div>
        <button class="btn btn-success btn-sm me-2" onclick="toggleTask(${index})">✔</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${index}, this)">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  const priority = prioritySelect.value;
  if (!text) return;

  tasks.push({ text, completed: false, priority });
  saveTasks();
  renderTasks();
  taskInput.value = "";

  // Show Bootstrap Toast
  const toast = new bootstrap.Toast(document.getElementById('liveToast'));
  toast.show();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index, btn) {
  const li = btn.closest("li");
  li.classList.add("task-exit");
  setTimeout(() => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }, 400); // match fadeOut duration
}

taskForm.addEventListener("submit", addTask);
renderTasks();
