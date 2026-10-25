const newTaskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-task-button');
const incompleteTaskList = document.getElementById('incomplete-tasks');
const completedTaskList = document.getElementById('completed-tasks');

const initialTasks = [
  { text: 'Pay Bills', isCompleted: false },
  { text: 'Go Shopping', isCompleted: false, isEditing: true },
  { text: 'See the Doctor', isCompleted: true },
];

const createElement = function (tagName, properties) {
  return Object.assign(document.createElement(tagName), properties);
};

const createNewTaskElement = function (taskText, isCompleted) {
  const listItem = document.createElement('li');

  const checkBox = createElement('input', { type: 'checkbox', checked: isCompleted });
  // innerText, not innerHTML: the task text comes from user input and must not be parsed as markup.
  const label = createElement('label', { className: 'task', innerText: taskText });
  const editInput = createElement('input', { type: 'text', className: 'task' });
  const editButton = createElement('button', { className: 'edit', innerText: 'Edit' });
  const deleteButton = createElement('button', { className: 'delete' });
  deleteButton.appendChild(createElement('img', { src: './remove.svg' }));

  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
};

const getTaskList = function (isCompleted) {
  return isCompleted ? completedTaskList : incompleteTaskList;
};

const renderTask = function ({ text, isCompleted, isEditing }) {
  const listItem = createNewTaskElement(text, isCompleted);

  bindTaskEvents(listItem);
  if (isEditing) toggleTaskEditMode(listItem);
  getTaskList(isCompleted).appendChild(listItem);
};

const addTask = function () {
  if (!newTaskInput.value) return;
  renderTask({ text: newTaskInput.value, isCompleted: false });

  newTaskInput.value = '';
};

const toggleTaskEditMode = function (listItem) {
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

const editTask = function (event) {
  toggleTaskEditMode(event.currentTarget.closest('li'));
};

const deleteTask = function (event) {
  event.currentTarget.closest('li').remove();
};

const toggleTaskCompletion = function (event) {
  const checkBox = event.currentTarget;
  getTaskList(checkBox.checked).appendChild(checkBox.closest('li'));
};

const bindTaskEvents = function (listItem) {
  const checkBox = listItem.querySelector('input[type=checkbox]');
  const editButton = listItem.querySelector('button.edit');
  const deleteButton = listItem.querySelector('button.delete');

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  checkBox.addEventListener('change', toggleTaskCompletion);
};

addButton.addEventListener('click', addTask);
initialTasks.forEach(renderTask);
