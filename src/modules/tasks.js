import {createModal} from './modal.js';
import {addTasksToDeletedColumn, counterForDeletedColumn} from './deleted-column.js';
import {appendTasksInColumns} from './columns.js';
import {setItemToLS, getItemFromLS} from '../utils/local-storage.js';
import {createDetailModal} from './detailModal.js';

export function createTask(todo, isDeleted) {
  const mainModalContainer = document.getElementById('mainModalContainer');
  const task = document.createElement('div');
  const taskIdAvatarContainer = document.createElement('div');
  const taskId = document.createElement('p');
  const taskAvatar = document.createElement('div');
  const taskDescription = document.createElement('p');
  const iconContainer = document.createElement('div');
  task.className = 'task';
  task.id = todo.id;
  
  /*draggable*/
  task.draggable = !isDeleted;
  taskIdAvatarContainer.className = 'task-id-avatar-container';

  taskId.className = 'task-id';
  taskId.innerHTML = `ID: ${todo.id}` ;

  taskAvatar.className = 'task-avatar';
  taskAvatar.style.backgroundImage = `url('${todo.avatar}')`;

  taskDescription.className = 'task-description';
  taskDescription.innerHTML = todo.title;

  iconContainer.className = 'task-edit-icon-container';
  const containerForDelAndResol = document.createElement('div');
 

  const priorityIcon = document.createElement('div');
  priorityIcon.className = 'task-priority-icon';
  priorityIcon.draggable = false;

  if(todo.priority === 'middle') {
    priorityIcon.classList.add('priority-middle');

  }
  if(todo.priority === 'low') {
    priorityIcon.classList.add('priority-low');
  }
  if(todo.priority === 'height') {
    priorityIcon.classList.add('priority-height');  }

  iconContainer.append(priorityIcon);
  iconContainer.append(containerForDelAndResol);


  if (isDeleted) {
    // create and append recovery icon
    const resolvedTaskIcon = document.createElement('img');
    resolvedTaskIcon.className = 'task-delete-icon';
    resolvedTaskIcon.setAttribute('src','img/refund.png');
    containerForDelAndResol.append(resolvedTaskIcon);

    task.classList.add('taskInDeletedColumn')
    task.classList.add('forhoverTask');

    resolvedTaskIcon.addEventListener('click', function() {
      const tasksFromLS = getItemFromLS('tasks');
      setItemToLS('tasks', [todo, ...tasksFromLS]);
      appendTasksInColumns();
      counterTasks();

      const deletedTasksFromLS = getItemFromLS('deletedTasks');
      const deletedTaskIndex = deletedTasksFromLS.findIndex((t) => t.id === todo.id);
      deletedTasksFromLS.splice(deletedTaskIndex, 1);
      setItemToLS('deletedTasks', deletedTasksFromLS);
      addTasksToDeletedColumn();
      counterForDeletedColumn();
    })
  } else {
    // create and append delete icon
    const taskDeleteIcon = document.createElement('img');
    taskDeleteIcon.draggable = false;
    taskDeleteIcon.className = 'task-edit-icon';
    taskDeleteIcon.setAttribute('src','img/trash.svg');

    taskDeleteIcon.addEventListener('click', () => {
      const deleteModalEl = createModal(todo);
      mainModalContainer.append(deleteModalEl);
      mainModalContainer.classList.add('window-inactive');
    });

    containerForDelAndResol.append(taskDeleteIcon);
    // create and append edit icon
    const taskEditIcon = document.createElement('img');
    taskEditIcon.draggable = false;
    taskEditIcon.className = 'task-edit-icon';
    taskEditIcon.setAttribute('src','img/free-icon-edit-2698233.svg');
    containerForDelAndResol.append(taskEditIcon);
//появление модалки при клике на карандаш
    taskEditIcon.addEventListener('click', function () {

      const modalDetail = createDetailModal(todo.id);
      debugger;
      mainModalContainer.append(modalDetail);
      mainModalContainer.classList.add('window-inactive');

    })
  }

  taskIdAvatarContainer.append(taskId);
  taskIdAvatarContainer.append(taskAvatar);
  task.append(taskIdAvatarContainer);
  task.append(taskDescription);
  task.append(iconContainer);
  return task;
}

export function deleteTask(task) {
    // remove task from localStorage('tasks')
    const tasks = getItemFromLS('tasks');
    const deletedTaskIndex = tasks.findIndex((t) => t.id === task.id);
    const deletedTask = tasks.splice(deletedTaskIndex, 1)[0];
    setItemToLS('tasks', tasks)

    // add task to localStorage('deletedTasks')
    const deletedTasks = getItemFromLS('deletedTasks');
    setItemToLS('deletedTasks', [deletedTask, ...deletedTasks]);

    // delete taskEl from DOM
    const currentTaskEl = document.getElementById(task.id);
    currentTaskEl.remove();
}

export function counterTasks () {
  document.getElementById('counterToDo').innerHTML = document.getElementById('toDo').children.length;
  document.getElementById('counterInProgress').innerHTML = document.getElementById('inProgress').children.length;
  document.getElementById('counterDone').innerHTML = document.getElementById('done').children.length;
}
