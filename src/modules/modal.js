import {deleteTask, counterTasks} from './tasks.js';
import {addTasksToDeletedColumn, counterForDeletedColumn} from './deleted-column.js';

export function createModal (todo) {
  const mainModalContainer = document.getElementById('mainModalContainer');
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
    mainModalContainer.classList.remove('window-inactive');
  });

  buttonDelete.addEventListener('click',function () {
    deleteTask(todo);
    counterTasks();
    addTasksToDeletedColumn();
    counterForDeletedColumn();
    modalContainer.remove();
    mainModalContainer.classList.remove('window-inactive'); 
  });

  modalContainer.className = 'modal-container';
  modalContainer.id = 'modalContainer';

  modalContainer.append(header);
  modalContainer.append(buttonContainer);
  buttonContainer.append(buttonCancel);
  buttonContainer.append(buttonDelete);

  return modalContainer;
}