const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const submitBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
let taskCount = document.getElementById("task-count");

const taskArr = [];
taskCount = taskArr.length + 1;

function addTask() {
  const text = input.value.trim();
  const mainT = text[0].toUpperCase() + text.slice(1);

  if (text !== "") {
    taskArr.push(mainT);
    console.log(taskArr);

    input.value = "";

    todoList.insertAdjacentHTML(
      "afterbegin",
      `
      <li class="todo-item ">
        <label class="todo-label">
          <input type="checkbox" class="todo-checkbox" data-id="1"  />
          <span class="todo-text">${mainT}</span>
        </label>
        <button class="delete-btn" data-id="1" aria-label="Delete task">
          ×
        </button>
      </li>`,
    );
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  addTask();
});
