import {createModal} from './modal.js';
import {appendTaskInColumn, counterForDeleted, getSearchParams} from './index.js';


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
  
  /*drag&drop*/
  task.draggable = !isDeleted;
  taskIdAvatarContainer.className = 'task-id-avatar-container';

  taskId.className = 'task-id';
  taskId.innerHTML = `ID: ${todo.id}` ;

  taskAvatar.className = 'task-avatar';
  taskAvatar.style.backgroundImage = `url('${todo.avatar}')`;

  taskDescription.className = 'task-description';
  taskDescription.innerHTML = todo.title;

  iconContainer.className = 'task-edit-icon-container';
  
  if (isDeleted) {
    // create and append recovery icon
    const resolvedTaskIcon = document.createElement('img');
    resolvedTaskIcon.className = 'task-delete-icon';
    resolvedTaskIcon.setAttribute('src','img/refund.png');
    iconContainer.append(resolvedTaskIcon);

    task.classList.add('taskInDeletedColumn')
    task.classList.add('forhoverTask');

    resolvedTaskIcon.addEventListener('click', function() {
      const tasksFromLS = JSON.parse(localStorage.getItem('tasks'));
      localStorage.setItem('tasks', JSON.stringify([todo, ...tasksFromLS]));
      appendTaskInColumn();
      
      const deletedTasksFromLS = JSON.parse(localStorage.getItem('deletedTasks'));
      const deletedTaskIndex = deletedTasksFromLS.findIndex((t) => t.id === todo.id);
      deletedTasksFromLS.splice(deletedTaskIndex, 1);
      localStorage.setItem('deletedTasks', JSON.stringify(deletedTasksFromLS));
      appendDeleteTaskInColumn();
      counterForDeleted ();
    })
  } else {
    // create and append delete icon
    const taskDeleteIcon = document.createElement('img');
    taskDeleteIcon.className = 'task-edit-icon';
    taskDeleteIcon.setAttribute('src','img/trash.svg');
    taskDeleteIcon.addEventListener('click', () => {
      const deleteModalEl = createModal(todo);
      mainModalContainer.append(deleteModalEl);
      mainModalContainer.classList.add('window-inactive');
    });
    iconContainer.append(taskDeleteIcon);
    // create and append edit icon
    const taskEditIcon = document.createElement('img');
    taskEditIcon.className = 'task-edit-icon';
    taskEditIcon.setAttribute('src','img/free-icon-edit-2698233.svg');
    iconContainer.append(taskEditIcon);
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
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const deletedTaskIndex = tasks.findIndex((t) => t.id === task.id);
    const deletedTask = tasks.splice(deletedTaskIndex, 1)[0];
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // add task to localStorage('deletedTasks')
    const currentTaskEl = document.getElementById(task.id);
    const deletedTasks = JSON.parse(localStorage.getItem('deletedTasks'));
    localStorage.setItem('deletedTasks', JSON.stringify([deletedTask, ...deletedTasks]));
  
    currentTaskEl.remove();
}

export function appendDeleteTaskInColumn() {
  const deletedColumn = document.getElementById('deleted');
  if (deletedColumn) {
    while (deletedColumn.firstChild) {
      deletedColumn.removeChild(deletedColumn.firstChild);
    };
    const filterFromUrl = Number(getSearchParams('byUser'));
    const deletedTasksFromLS = JSON.parse(localStorage.getItem('deletedTasks'));
    const filteredTasks = filterFromUrl === 0
    ? deletedTasksFromLS
    : deletedTasksFromLS.filter(task => task.userId === filterFromUrl);

    filteredTasks.forEach(taskObj => {
      const taskDOMEl = createTask(taskObj, true);
      deletedColumn.append(taskDOMEl);
    })
  }
}