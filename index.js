import users from './users.js';
import {counterTasks} from './src/modules/tasks.js';
import {createColumns, appendTasksInColumns, setDragNDropListeners} from './src/modules/columns.js';
import {getItemFromLS, setItemToLS} from './src/utils/local-storage.js';
import createAndAppendUsersSearchPanel from './src/modules/users-search-panel.js';

createAndAppendUsersSearchPanel();

// create and append "TODO", "IN PROGRESS", "DONE" columns
const mainContainer = document.getElementById('main-container');
const columns = createColumns();
mainContainer.append(columns);

// установить в LS изначальное значение для deletedTasks если его там нет
if (!getItemFromLS('deletedTasks')) {
  setItemToLS('deletedTasks', []);
};

fetchAllTodos()
  .then(appendTasksInColumns)
  .then(setDragNDropListeners)
  .then(counterTasks);

async function fetchAllTodos () {
  if(getItemFromLS('tasks')) {
    return;
  }
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const tasksFromServer = await response.json();
  const tasks = tasksFromServer.map(setInitialAvatarAndStatus);
  setItemToLS('tasks', tasks);
};

 
function setInitialAvatarAndStatus(task) {
  let status = 'TODO';
  let user = users.find(user => user.id == task.userId);
  if (task.id % 3 == 0) {
    status = 'DONE';
  }
  if (task.id % 5 == 0) {
    status = 'INPROGRESS';
  }
  return { ...task, status, avatar: user.avatar };
}
