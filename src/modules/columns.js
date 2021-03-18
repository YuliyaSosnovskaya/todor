import {getSearchParams} from '../utils/search-params.js'
import {getItemFromLS, setItemToLS} from '../utils/local-storage.js';
import {createTask, counterTasks} from './tasks.js';

export function createColumn(columnName) {
  const columnDOMEl = document.createElement('div');

  const columnNameContainer = document.createElement('div');
  const columnNameDOMEl = document.createElement('div');
  columnNameDOMEl.className = 'column-name';

  const colorContainer = document.createElement('div');

  const counterDOMEl = document.createElement('div');
  counterDOMEl.className = 'counter';

  if (columnName === 'todo') {
    // append plus icon to TODO column
    const plusIcon = document.createElement('img');
    plusIcon.setAttribute('src','img/svg');
    plusIcon.className = 'plus-icon';
    columnNameContainer.append(plusIcon);
    colorContainer.className = 'column column-task-container1';
    colorContainer.id = 'toDo';
    columnDOMEl.className = 'todo-column';
    columnDOMEl.id = 'toDoColumn';
    columnNameContainer.className = 'todo-name-container';
    counterDOMEl.id = 'counterToDo';
    columnNameDOMEl.innerHTML = 'TO DO';
  }

  if (columnName === 'inProgress') {
    columnNameContainer.className = 'inprogress-name-container';
    colorContainer.className = 'column column-task-container2';
    colorContainer.id = 'inProgress';
    columnDOMEl.className = 'inprogress-column';
    columnDOMEl.id = 'inProgressColumn';
    counterDOMEl.classList.add('counter-inprogress');
    counterDOMEl.id = 'counterInProgress';
    columnNameDOMEl.innerHTML = 'IN PROGRESS';
  }

  if (columnName === 'done') {
    columnNameContainer.className = 'inprogress-name-container';
    colorContainer.className = 'column column-task-container3';
    colorContainer.id = 'done';
    columnDOMEl.className = 'done-column';
    columnDOMEl.id = 'doneColumn';
    counterDOMEl.classList.add('counter-done');
    counterDOMEl.id = 'counterDone';
    columnNameDOMEl.innerHTML = 'DONE';
  }

  if (columnName === 'deleted') {
    columnNameContainer.className = 'deleted-name-container';
    colorContainer.className = 'column column-task-container4';
    colorContainer.id = 'deleted';
    columnDOMEl.className = 'deleted-column';
    columnDOMEl.id = 'deletedColumn';
    counterDOMEl.id = 'counterDeleted';
    columnNameDOMEl.innerHTML = 'DELETED';
  }

  columnNameContainer.append(counterDOMEl);
  columnNameContainer.append(columnNameDOMEl);

  columnDOMEl.append(columnNameContainer);
  columnDOMEl.append(colorContainer);

  return columnDOMEl;
}

export function createColumns () {
  const columnsContainer = document.createElement('div');
  columnsContainer.className = 'main-column-container';

  ['todo', 'inProgress', 'done'].forEach((columnStatus) => {
    const columnDOMEl = createColumn(columnStatus);
    columnsContainer.append(columnDOMEl);
  })

  return columnsContainer;
}

export function appendTasksInColumns() {
  const toDoColumn = document.getElementById('toDo');
  const inProgressColumn = document.getElementById('inProgress');
  const doneColumn = document.getElementById('done');
  
  while (toDoColumn.firstChild) {
    toDoColumn.removeChild(toDoColumn.firstChild);
  };
  while (inProgressColumn.firstChild) {
    inProgressColumn.removeChild(inProgressColumn.firstChild);
  };
  while (doneColumn.firstChild) {
    doneColumn.removeChild(doneColumn.firstChild);
  };

  const tasksFromLS = getItemFromLS('tasks');
  const userId = Number(getSearchParams('byUser'));
  const priority = getSearchParams('priority') ;

  const description = getSearchParams('desc');


  let filteredTasks = [...tasksFromLS];
  // filter by user
  if (userId !== 0) {
    filteredTasks = filteredTasks.filter(task => task.userId === userId)
  }

  // filter by priority
  if (priority) {
    filteredTasks = filteredTasks.filter(task => task.priority === priority);
  }

  if (description) {
    
    filteredTasks = filteredTasks.filter(task => task.title.toLowerCase().includes(description.toLowerCase()));
  }

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

  counterTasks();
}

export function setDragNDropListeners() {
  let task;
  const dragDrop = function(event) {
    task.classList.remove('hide');

    const goalColumn = event.target.closest('.column');
   
    if (!goalColumn || goalColumn.id === 'deleted') {
      return;
    }

    goalColumn.classList.remove('hovered');

    let tasks = getItemFromLS('tasks');

    const dragedTask = tasks.find(currentTask => currentTask.id == task.id);
    if (goalColumn.id.toUpperCase() !== dragedTask.status) {
      goalColumn.prepend(task);    
      dragedTask.status = goalColumn.id.toUpperCase();
      counterTasks();
      setItemToLS('tasks', tasks);
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

  document.getElementById('toDo').addEventListener('dragstart', dragStart);
  document.getElementById('inProgress').addEventListener('dragstart', dragStart);
  document.getElementById('done').addEventListener('dragstart', dragStart);
  document.body.addEventListener('drop', dragDrop);
  document.body.addEventListener('dragover', dragOver);
}