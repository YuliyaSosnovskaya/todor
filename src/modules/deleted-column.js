import {getSearchParams} from '../utils/search-params.js';
import {getItemFromLS} from '../utils/local-storage.js';
import {createColumn} from './columns.js';
import {createTask} from './tasks.js';

const toggle = document.getElementById('switch');

toggle.addEventListener('click', function (event) {
  //уменьшается ширина всех колонок 
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
  //если toggle  не активен то меняем ширину колонок обратно и удаляем колонку deleted
  if (!event.currentTarget.checked) {
    const deletedColumn = document.getElementById('deletedColumn');
    toDoColumn.classList.remove('width-column-with-deleted');
    inProgressColumn.classList.remove('width-column-with-deleted');
    doneColumn.classList.remove('width-column-with-deleted');
    deletedColumn.remove();
  }
});

//счетчик для колонки deleted,только если она открыта 
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
  
    const deletedTasksFromLS = getItemFromLS('deletedTasks');
    const userId = Number(getSearchParams('byUser'));
    const priority = getSearchParams('priority') ;
    const description = getSearchParams('desc');

    let filteredTasks = [...deletedTasksFromLS];
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
      description.toLowerCase();
      filteredTasks = filteredTasks.filter(task => task.title.includes(description.toLowerCase()));
    }
    //создаем и добавляем deleted таски 
    filteredTasks.forEach(taskObj => {
      const taskDOMEl = createTask(taskObj, true);
      deletedColumn.append(taskDOMEl);
    });
    
    counterForDeletedColumn ();
  }

}
