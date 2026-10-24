const newTaskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskList = document.getElementById('incomplete-tasks');
const completedTaskList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskText) {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskText;
  label.className = 'task';

  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

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

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (listItem, checkBoxEventHandler) {
  const checkBox = listItem.querySelector('input[type=checkbox]');
  const editButton = listItem.querySelector('button.edit');
  const deleteButton = listItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

const bindTaskListEvents = function (taskList, checkBoxEventHandler) {
  for (const listItem of taskList.children) {
    bindTaskEvents(listItem, checkBoxEventHandler);
  }
};

bindTaskListEvents(incompleteTaskList, markTaskCompleted);
bindTaskListEvents(completedTaskList, markTaskIncomplete);
