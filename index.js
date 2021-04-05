import users from './users.js';
import {counterTasks} from './src/modules/tasks.js';
import {createColumns, appendTasksInColumns, setDragNDropListeners} from './src/modules/columns.js';
import {getItemFromLS, setItemToLS} from './src/utils/local-storage.js';
import createAndAppendUsersSearchPanel from './src/modules/users-search-panel.js';
import {createPrioritySelect} from '/src/modules/priority.js';
import {createSearchDesc} from '/src/modules/searchByDescription.js';
import {createHeader} from './src/modules/header.js';

createHeader();
createAndAppendUsersSearchPanel();

// create and prepend priority filter DOM element
const toggleContainer = document.getElementsByClassName('toggle-container')[0];
const searchPriorityContainer = document.createElement('div');
searchPriorityContainer.style.display = 'flex';

const priorityFilterDOMEl = createPrioritySelect();
searchPriorityContainer.append(priorityFilterDOMEl);
toggleContainer.prepend(searchPriorityContainer);

//create and append searchByDescription DOM element
const searchDesc = createSearchDesc();
searchPriorityContainer.prepend(searchDesc);

// create and append "TODO", "IN PROGRESS", "DONE" columns
const mainContainer = document.getElementById('main-container');
const columns = createColumns();
mainContainer.append(columns);

// установить в LS изначальное значение для deletedTasks если его там нет
if (!getItemFromLS('deletedTasks')) {
  setItemToLS('deletedTasks', []);
};
//при выполнении запроса 
fetchAllTodos()
  .then(appendTasksInColumns)
  .then(setDragNDropListeners)
  .then(counterTasks);
//запрос на сервер для получения тасков
async function fetchAllTodos () {
  //проверка или уже есть таски в LS
  if(getItemFromLS('tasks')) {
    return;
  }
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const tasksFromServer = await response.json();
  const tasks = tasksFromServer.map(setInitialStaff);
  setItemToLS('tasks', tasks);
};

// добавление таскам с сервера приоритета и статуса 
function setInitialStaff(task) {
  let priority = 'middle';
  let status = 'TODO';
  let user = users.find(user => user.id == task.userId);
  if(task.id % 4 == 0) {
    priority = 'low';
  }
  if(task.id % 10 == 0) {
    priority = 'height';
  }
  if (task.id % 3 == 0) {
    status = 'DONE';
  }
  if (task.id % 5 == 0) {
    status = 'INPROGRESS';
  }

  return { ...task, status, avatar: user.avatar ,priority};
}
