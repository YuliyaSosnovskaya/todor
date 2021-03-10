import {createTask, appendDeleteTaskInColumn} from './tasks.js';
import {createColumns} from './columns.js';
import users from './users.js';
import {createSearchUsers} from './searchUsers.js';
import {createModal} from './modal.js';
import {createColumnDelete} from './createDeleteColumn.js';

const body = document.getElementById('body');
const mainContainer = document.getElementById('main-container');
body.droppable = true;
const search = document.getElementById('sort-container');
// const user = createSearchUsers();
// search.append(user);

const columns = createColumns();
mainContainer.append(columns);
/*цветные колонки для вставки тасков*/
const toDoColumn = document.getElementById('toDo');
const inProgressColumn = document.getElementById('inProgress');
const doneColumn = document.getElementById('done');
const deletedColumn = document.getElementById('deleted');

/*counters*/
const counterToDo = document.getElementById('counterToDo');
const counterInProgress = document.getElementById('counterInProgress');
const counterDone = document.getElementById('counterDone');




/*modal*/

export function getSearchParams (key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}
export function setSearchParams (key, value) {
  const params = new URLSearchParams(window.location.search);
  params.set(key, value);
  const {origin, pathname} = document.location;
  const url = origin + pathname + '?' + params.toString();

  history.pushState({[key]: value}, '', url); // change url without page reloading
}
function deleteSearchParams (key) {
  const params = new URLSearchParams(window.location.search);
  params.delete(key);
  const {origin, pathname} = document.location;
  const newParamsString = params.toString();
  if (newParamsString === '') {
    history.pushState({}, '', `${origin}${pathname}`);
  } else {
    history.pushState({}, '', `${origin}${pathname}?${newParamsString}`);
  }
}

if (!localStorage.getItem('deletedTasks')) {
  
  localStorage.setItem('deletedTasks',JSON.stringify([]));
};

const toggle = document.getElementById('switch');

toggle.addEventListener('click', function (event) {
  
  const mainColumnContainer = document.getElementsByClassName('main-column-container')[0];
  const toDoColumn = document.getElementById('toDoColumn');
  const inProgressColumn = document.getElementById('inProgressColumn');
  const doneColumn = document.getElementById('doneColumn');

  if(event.currentTarget.checked) {
    const deletedColumn = createColumnDelete();

    toDoColumn.classList.add('width-column-with-deleted');
    inProgressColumn.classList.add('width-column-with-deleted');
    doneColumn.classList.add('width-column-with-deleted');
    deletedColumn.classList.add('width-column-with-deleted');
    mainColumnContainer.append(deletedColumn);
    appendDeleteTaskInColumn();
    counterForDeleted ();
  }

  if (!event.currentTarget.checked) {
    const deletedColumn = document.getElementById('deletedColumn');
    toDoColumn.classList.remove('width-column-with-deleted');
    inProgressColumn.classList.remove('width-column-with-deleted');
    doneColumn.classList.remove('width-column-with-deleted');
    deletedColumn.remove();
  }
  
});
export function counterForDeleted () {
  const deletedColorColumn = document.getElementById('deleted');
  if(deletedColorColumn) {
    const counterDeleted = document.getElementById('counterDeleted');
    counterDeleted.innerHTML = deletedColorColumn.children.length;
  }
  
}

function appendUsers(users) {
  const allUsersEl = createSearchUsers(
    {
      name: 'All',
      avatar: 'img/team1.png',
      id: 0
    }
  );
  search.append(allUsersEl);

  users.forEach(user => {
    const userEl = createSearchUsers(user);
    search.append(userEl);
  });

  // set styles for init filter user
  const filterUserId = Number(getSearchParams('byUser'));

  const filterUser = users.find((user => user.id === filterUserId));
  let filterUserElAtrId = filterUser ? `${filterUser.name}-${filterUser.id}` : 'All-0';
  const filterUserDOMEl = document.getElementById(filterUserElAtrId);
  filterUserDOMEl.getElementsByClassName('container-for-avatar')[0].classList.add('container-for-avatar-hover');

  const usersElements = document.getElementsByClassName('search-user');
  for (let userEl of usersElements) {
    userEl.addEventListener('mouseover', function () {
      if (userEl.id === filterUserElAtrId) return;
      const avatarEl = userEl.getElementsByClassName('container-for-avatar')[0];
      avatarEl.classList.add('container-for-avatar-hover');
    });
    userEl.addEventListener('mouseout', function (event) {
      if (userEl.id === filterUserElAtrId) return;
      const avatarEl = userEl.getElementsByClassName('container-for-avatar')[0];
      avatarEl.classList.remove('container-for-avatar-hover');
    });
    userEl.addEventListener('click', function () {

      if (filterUserElAtrId !== userEl.id) {

        const activeUserEl = document.getElementById(filterUserElAtrId);
        const activeUserAvatar = activeUserEl.getElementsByClassName('container-for-avatar')[0];
        activeUserAvatar.classList.remove('container-for-avatar-hover');
        filterUserElAtrId = userEl.id;
        const userId = filterUserElAtrId.split('-')[1];
        if (Number(userId)) {
          setSearchParams('byUser', Number(filterUserElAtrId.split('-')[1]));
        } else {
          deleteSearchParams ('byUser');
        }
        // localStorage.setItem('filter', JSON.stringify({userId: Number(filterUserElAtrId.split('-')[1])}));
        const avatarEl = userEl.getElementsByClassName('container-for-avatar')[0];
        avatarEl.classList.add('container-for-avatar-hover');
        appendTaskInColumn();
        appendDeleteTaskInColumn();
        counterTasks ();
        counterForDeleted();
      }
    })
  }
}

export function appendTaskInColumn() {
  
  while (toDoColumn.firstChild) {
    toDoColumn.removeChild(toDoColumn.firstChild);
  };
  while (inProgressColumn.firstChild) {
    inProgressColumn.removeChild(inProgressColumn.firstChild);
  };
  while (doneColumn.firstChild) {
    doneColumn.removeChild(doneColumn.firstChild);
  };

  let tasksFromLS = JSON.parse(localStorage.getItem('tasks'));
  let userId = Number(getSearchParams('byUser'));
  const filteredTasks = userId === 0
    ? tasksFromLS
    : tasksFromLS.filter(task => task.userId === userId);

  filteredTasks.forEach(todo => {
    const task = createTask(todo);

    if (todo.status == 'TODO') {
      toDoColumn.append(task);
    }
    if (todo.status == 'DONE') {
      doneColumn.append(task);
    } 
    if(todo.status == 'INPROGRESS') {
      inProgressColumn.append(task);
    }

  });
}

function setAvatarAndStatus(task) {
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

async function fetchAllTodos () {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const tasksFromServer = await response.json();
  if(localStorage.getItem('tasks')) {
    return;
  }
  const tasks = tasksFromServer.map(setAvatarAndStatus);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export function counterTasks () {
  counterToDo.innerHTML = toDoColumn.children.length;
  counterInProgress.innerHTML = inProgressColumn.children.length;
  counterDone.innerHTML = doneColumn.children.length;

}

function setDragNDropListeners() {
  let task;
  const dragDrop = function(event) {
    task.classList.remove('hide');

    const goalColumn = event.target.closest('.column');
   
    if (!goalColumn || goalColumn.id === 'deleted') {
      return;
    }

    goalColumn.classList.remove('hovered');

    let tasks = JSON.parse(localStorage.getItem('tasks'));

    const dragedTask = tasks.find(currentTask => currentTask.id == task.id);
    if (goalColumn.id.toUpperCase() !== dragedTask.status) {
      goalColumn.prepend(task);    
      dragedTask.status = goalColumn.id.toUpperCase();
      counterTasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  };

  const dragStart = function(event) {
    task = event.target;
    setTimeout(() => {
      task.classList.add('hide');
    },0)
  }

  let hoveredColumn;
  const dragOver = function(event) {
    event.preventDefault();

    const goalColumn = event.target.closest('.column');
    if (goalColumn && goalColumn.id === 'deleted') {
      return;
    }
    if (!hoveredColumn && goalColumn) {
      hoveredColumn = goalColumn;
      hoveredColumn.classList.add('hovered');
    }

    if (hoveredColumn && !goalColumn) {
      hoveredColumn.classList.remove('hovered');
      hoveredColumn = null;
    }
  };

  toDoColumn.addEventListener('dragstart', dragStart);
  inProgressColumn.addEventListener('dragstart', dragStart);
  doneColumn.addEventListener('dragstart', dragStart);
  body.addEventListener('drop', dragDrop);
  body.addEventListener('dragover', dragOver);
}


appendUsers(users);


fetchAllTodos()
  .then(appendTaskInColumn)
  .then(setDragNDropListeners)
  .then(counterTasks);

  /*create modal*/
   