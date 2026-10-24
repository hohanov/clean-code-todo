const newTaskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskList = document.getElementById('incomplete-tasks');
const completedTaskList = document.getElementById('completed-tasks');

const createElement = function (tagName, properties) {
  return Object.assign(document.createElement(tagName), properties);
};

const createNewTaskElement = function (taskText) {
  const listItem = document.createElement('li');

  const checkBox = createElement('input', { type: 'checkbox' });
  // innerText, not innerHTML: the task text comes from user input and must not be parsed as markup.
  const label = createElement('label', { className: 'task', innerText: taskText });
  const editInput = createElement('input', { type: 'text', className: 'task' });
  const editButton = createElement('button', { className: 'edit', innerText: 'Edit' });
  const deleteButton = createElement('button', { className: 'delete' });
  deleteButton.appendChild(createElement('img', { src: './remove.svg' }));

  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const listItem = createNewTaskElement(newTaskInput.value);

  moveTaskToIncomplete(listItem);

  newTaskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('edit-mode');
  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('edit-mode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const moveTaskToIncomplete = function (listItem) {
  incompleteTaskList.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);
};

const moveTaskToCompleted = function (listItem) {
  completedTaskList.appendChild(listItem);
  bindTaskEvents(listItem, markTaskIncomplete);
};

const markTaskCompleted = function () {
  moveTaskToCompleted(this.parentNode);
};

const markTaskIncomplete = function () {
  moveTaskToIncomplete(this.parentNode);
};

const bindTaskEvents = function (listItem, checkBoxEventHandler) {
  const checkBox = listItem.querySelector('input[type=checkbox]');
  const editButton = listItem.querySelector('button.edit');
  const deleteButton = listItem.querySelector('button.delete');

  // Property assignment, not addEventListener: a task is rebound on every move between lists,
  // and the previous checkbox handler has to be replaced, not kept alongside the new one.
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

const bindTaskListEvents = function (taskList, checkBoxEventHandler) {
  for (const listItem of taskList.children) {
    bindTaskEvents(listItem, checkBoxEventHandler);
  }
};

addButton.addEventListener('click', addTask);
bindTaskListEvents(incompleteTaskList, markTaskCompleted);
bindTaskListEvents(completedTaskList, markTaskIncomplete);
