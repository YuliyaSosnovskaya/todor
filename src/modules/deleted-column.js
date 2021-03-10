import {getSearchParams} from '../utils/search-params.js';
import {getItemFromLS} from '../utils/local-storage.js';
import {createColumn} from './columns.js';
import {createTask} from './tasks.js';

const toggle = document.getElementById('switch');

toggle.addEventListener('click', function (event) {
  const mainColumnContainer = document.getElementsByClassName('main-column-container')[0];
  const toDoColumn = document.getElementById('toDoColumn');
  const inProgressColumn = document.getElementById('inProgressColumn');
  const doneColumn = document.getElementById('doneColumn');

  if (event.currentTarget.checked) {
    const deletedColumn = createColumn('deleted');

    // change width of columns if toggle is checked
    [toDoColumn, inProgressColumn, doneColumn, deletedColumn].forEach(column => {
      column.classList.add('width-column-with-deleted');
    });

    mainColumnContainer.append(deletedColumn);
    addTasksToDeletedColumn();
    counterForDeletedColumn();
  }

  if (!event.currentTarget.checked) {
    const deletedColumn = document.getElementById('deletedColumn');
    toDoColumn.classList.remove('width-column-with-deleted');
    inProgressColumn.classList.remove('width-column-with-deleted');
    doneColumn.classList.remove('width-column-with-deleted');
    deletedColumn.remove();
  }
});

export function counterForDeletedColumn () {
  const deletedColorColumn = document.getElementById('deleted');
  if(deletedColorColumn) {
    const counterDeleted = document.getElementById('counterDeleted');
    counterDeleted.innerHTML = deletedColorColumn.children.length;
  } 
}

export function addTasksToDeletedColumn() {
  const deletedColumn = document.getElementById('deleted');
  if (deletedColumn) {
    while (deletedColumn.firstChild) {
      deletedColumn.removeChild(deletedColumn.firstChild);
    };
    const filterFromUrl = Number(getSearchParams('byUser'));
    const deletedTasksFromLS = getItemFromLS('deletedTasks');
    const filteredTasks = filterFromUrl === 0
      ? deletedTasksFromLS
      : deletedTasksFromLS.filter(task => task.userId === filterFromUrl);

    filteredTasks.forEach(taskObj => {
      const taskDOMEl = createTask(taskObj, true);
      deletedColumn.append(taskDOMEl);
    })
  }
}
