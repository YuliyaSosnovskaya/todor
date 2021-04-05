import {getSearchParams} from '../utils/search-params.js'
import {getItemFromLS, setItemToLS} from '../utils/local-storage.js';
import {createTask, counterTasks} from './tasks.js';
import {createDetailModal} from './detailModal.js';
import { showModalBackground } from '../utils/modal-background.js';

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
    plusIcon.setAttribute('src', '../../img/svg');
    plusIcon.className = 'plus-icon';
    plusIcon.addEventListener('click', function() {
      //проверка или пользователь залогинился
      if(!getItemFromLS('auth')) {
        alert('creating new tasks is available only for registered users');
        return;
      }
      //modal window is open
      const modalDetail = createDetailModal(true);
      document.body.append(modalDetail);
      showModalBackground();
    });
     
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
//создаются все колонки и append в общий контейнер
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
  //filter by description
  if (description) {
    filteredTasks = filteredTasks.filter(task => task.title.toLowerCase().includes(description.toLowerCase()));
  }
  //sort by status 
  filteredTasks.forEach(todo => {
    const task = createTask(todo);

    if (todo.status == 'TODO') {
      toDoColumn.append(task);
    }
    if (todo.status == 'DONE') {
      doneColumn.append(task);
    } 
    if (todo.status == 'INPROGRESS') {
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
   //нельзя перетаскивать в колонку deleted
    if (!goalColumn || goalColumn.id === 'deleted') {
      return;
    }
    goalColumn.classList.remove('hovered');

    // проверка auth
    if (!getItemFromLS('auth')) {
      alert('changing the status of tasks is available only for registered users');
      return;
    }

    let tasks = getItemFromLS('tasks');
    //проверка перенесли мы перетаскиваемый таск в новую 
    //колонку или кинули в ту же откуда и взяли ,тогда не меняем статус
    //и обновляем tasks в LS
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
    //если колонка deleted то не подсвечивается(на неё нельзя кинуть),
    const goalColumn = event.target.closest('.column');
    if (goalColumn && goalColumn.id === 'deleted') {
      return;
    }
    //устанавливаем стиль(подсвечивание) при dropOver на неё(если ни одна колонка не подсвечена ещё)
    if (!hoveredColumn && goalColumn) {
      hoveredColumn = goalColumn;
      hoveredColumn.classList.add('hovered');
    }
    //убираем стиль подсвечивания с колонки если dropOver не на одной из колонок 
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