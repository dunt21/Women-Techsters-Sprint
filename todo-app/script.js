const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const submitBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const filterBtns = document.querySelector(".filters");

let taskCount = document.getElementById("task-count");

const taskArr = [];

function renderList(text, index) {
  todoList.insertAdjacentHTML(
    "afterbegin",
    `
      <li class="todo-item ">
        <label class="todo-label">
          <input type="checkbox" class="todo-checkbox" data-id=${index}  />
          <span class="todo-text">${text}</span>
        </label>
        <button class="delete-btn" data-id=${index} aria-label="Delete task">
          ×
        </button>
      </li>`,
  );
}

function updateCount() {
  const activeTasks = todoList.querySelectorAll("li:not(.completed)").length;
  taskCount.textContent = `${activeTasks} items left`;
}

function addTask() {
  const text = input.value.trim();
  const mainT = text[0].toUpperCase() + text.slice(1);

  if (text !== "") {
    taskArr.push(mainT);
    input.value = "";
    renderList(mainT, taskArr.length);
  }

  updateCount();
}

function checkTask(e) {
  if (e.target.classList.contains("todo-checkbox")) {
    const li = e.target.closest("li");
    li.classList.toggle("completed");

    updateCount();
  }
}

function deleteTask(e) {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;

    const li = e.target.closest("li");
    li.remove();

    updateCount();
  }
}

function filterActiveTasks() {
  const tasks = todoList.children;

  for (let li of tasks) {
    const isCompleted = li.classList.contains("completed");

    if (isCompleted) {
      const id = li.querySelector("input").dataset.id;

      li.style.display = "none";

      updateCount();
    } else li.style.display = "flex";
  }
}

function filterCompletedTasks() {
  const tasks = todoList.children;

  for (let li of tasks) {
    const isCompleted = li.classList.contains("completed");

    if (!isCompleted) {
      const id = li.querySelector("input").dataset.id;

      li.style.display = "none";
      updateCount();
    } else li.style.display = "flex";
  }
}

function filterAllTasks() {
  const tasks = todoList.children;

  for (let li of tasks) {
    li.style.display = "flex";
  }

  updateCount();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  addTask();
});

todoList.addEventListener("click", (e) => {
  checkTask(e);
  deleteTask(e);
});

filterBtns.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter;

  if (filter === "active") filterActiveTasks();
  if (filter === "completed") filterCompletedTasks();
  if (filter === "all") filterAllTasks();
});
