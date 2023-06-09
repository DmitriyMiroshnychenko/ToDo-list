const cardBody = document.querySelector(".card-body");
const inputTask = document.querySelector("#input-task");
const addButton = document.querySelector("#add-button");

// Load tasks from local storage if available
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const templateTask = (task, taskId, completed) => {
  const template = `
    <div class="task" task-id="${taskId}">
      <div class="description">
        <label class="checkbox">
          <input type="checkbox" onchange="onCheckboxChange(${taskId}, this.checked)" ${
    completed ? "checked" : ""
  } />
          <span class="checkmark"></span>
        </label>
        <span class="text">${task}</span>
      </div>
      <a href="javascript:void(0)" onclick="onClickRemoveTask(${taskId})">
        <i class="bi bi-trash"></i>
      </a>
    </div>
  `;

  return template;
};

const renderTasks = () => {
  const tasksHTML = tasks
    .map((task, index) => templateTask(task.text, index, task.completed))
    .join("");
  cardBody.innerHTML = tasksHTML;
};

const saveTasksToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const onClickAddTask = () => {
  const task = inputTask.value.trim();
  if (task !== "") {
    tasks.push({ text: task, completed: false });
    saveTasksToLocalStorage();
    renderTasks();
  }

  inputTask.value = "";
  inputTask.focus();
};

const onClickRemoveTask = (taskId) => {
  tasks.splice(taskId, 1);
  saveTasksToLocalStorage();
  renderTasks();
};

const onCheckboxChange = (taskId, isChecked) => {
  tasks[taskId].completed = isChecked;
  saveTasksToLocalStorage();
};

renderTasks();
