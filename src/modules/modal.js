import {deleteTask, counterTasks} from './tasks.js';
import {addTasksToDeletedColumn, counterForDeletedColumn} from './deleted-column.js';
import { hideModalBackground } from '../utils/modal-background.js';

export function createModal (todo) {
  const modalContainer = document.createElement('div');
  const header = document.createElement('div');
  const buttonContainer = document.createElement('div');
  const buttonCancel = document.createElement('div');
  const buttonDelete = document.createElement('div');

  header.className = 'modal-header';
  header.innerHTML = 'Task will be deleted.';
  buttonCancel.className = 'button-cancel';
  buttonCancel.id = 'buttonCancel';
  buttonCancel.innerHTML = 'Cancel'
  buttonDelete.className = 'button-delete';
  buttonDelete.id = 'buttonDelete';
  buttonDelete.innerHTML = 'Sure';
  buttonContainer.className = 'button-container';

  document.body.className = 'modal-out';
  
  buttonCancel.addEventListener('click',function () {
    modalContainer.remove();
    hideModalBackground();
  });

  buttonDelete.addEventListener('click',function () {
    deleteTask(todo);
    counterTasks();
    addTasksToDeletedColumn();
    counterForDeletedColumn();
    modalContainer.remove();
    hideModalBackground();
  });

  

  modalContainer.className = 'modal-container';
  modalContainer.id = 'modal-window';

  modalContainer.append(header);
  modalContainer.append(buttonContainer);
  buttonContainer.append(buttonCancel);
  buttonContainer.append(buttonDelete);

  return modalContainer;
}