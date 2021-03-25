import { setItemToLS, getItemFromLS } from "../utils/local-storage.js";
import {appendTasksInColumns} from './columns.js';
import {counterTasks} from './tasks.js';
import createSelect from './select-field.js';
import users from '../../users.js';

export function createDetailModal (isNew, taskId) {
  const tasksFromLS = getItemFromLS('tasks');
  const deletedTasksFromLS = getItemFromLS('deletedTasks');
  let  todo = {
    avatar: "./img/boy.png",
    priority: "low",
    id: tasksFromLS.length + deletedTasksFromLS.length + 1,
    status: "TODO",
    title: "",
    userId: 1
  };
  if(!isNew) {
    todo = tasksFromLS.find((task) => task.id === taskId);
  }
   

  const mainModalContainer = document.getElementById('mainModalContainer');
  const modalDetailContainer = document.createElement('div');
  modalDetailContainer.className = 'modal-detail-container';

  const idAvatarContainer = document.createElement('div');
  idAvatarContainer.className = 'id-avatar-container';
  modalDetailContainer.append(idAvatarContainer);

  const modalDetailId = document.createElement('div');
  modalDetailId.className = 'modal-detail-id';
  
  modalDetailId.innerHTML = `ID: ${todo.id}`;

  idAvatarContainer.append(modalDetailId);

  const modalAvatarContainer = document.createElement('div');
  modalAvatarContainer.className = 'modal-avatar-container';
  idAvatarContainer.append(modalAvatarContainer);

  const avatar =  document.createElement('img');
  avatar.className = 'avatar-detail-modal';
  avatar.setAttribute('src',todo.avatar);
  
  modalAvatarContainer.append(avatar);

//вставить дропдаун
  let optionsName = users.map((user) => {
    return user.name;
  });
  let currentUser = users.find((user) => {
    return user.id === todo.userId
  });


  function onChangeUserName(newUserName) {

    let findUser = users.find((user) => user.name == newUserName );

    let newAvatar = findUser.avatar;
    let newId = findUser.id;

    todo.avatar = newAvatar ;
    avatar.setAttribute('src',todo.avatar);

    todo.userId = newId;

  }

  const currentUserName = currentUser ? currentUser.name : '';
  const userSelectContainer = createSelect(currentUserName, optionsName, onChangeUserName);
  modalAvatarContainer.append(userSelectContainer);

  const userSelectButton = userSelectContainer.children[0];

  const descriptionContainer = document.createElement('div');
  descriptionContainer.className = 'description-modal';
  modalDetailContainer.append(descriptionContainer);

  const descrSpan = document.createElement('span');
  descrSpan.className = 'field-label';
  descrSpan.innerHTML = 'Description';
  descriptionContainer.append(descrSpan);

  const descrTextarea = document.createElement('textarea');
  
  descrTextarea.value = todo.title;
  descriptionContainer.append(descrTextarea);

  const dropdawnContainer = document.createElement('div');
  dropdawnContainer.className = 'dropdawns-container';
  modalDetailContainer.append(dropdawnContainer);

  

  //два дропдауна 
  let currentPriority = todo.priority;
  let priority = ['low','middle','height'];
  function onChangePriority (newPriority) {
    todo.priority = newPriority;
  }
  let prioritySelectContainer = createSelect(currentPriority,priority,onChangePriority);

  let currentStatus = todo.status;
  const status = ['TODO','INPROGRESS','DONE'];
  function onChangeStatus (newStatus) {
    todo.status = newStatus;
  }
  let statusSelectContainer = createSelect(currentStatus,status,onChangeStatus);

  
  const priorityBlock = document.createElement('div');
  const prioritySpan = document.createElement('span');
  prioritySpan.className = 'field-label';
  prioritySpan.innerHTML = 'Priority';
  priorityBlock.append(prioritySpan);
  priorityBlock.append(prioritySelectContainer);
  priorityBlock.style.marginRight = '30px';

  dropdawnContainer.append(priorityBlock);
 
  const statusBlock = document.createElement('div');
  const statusSpan = document.createElement('span');
  statusSpan.className = 'field-label';
  statusSpan.innerHTML = 'Status';
  statusBlock.append(statusSpan);
  statusBlock.append(statusSelectContainer);

  dropdawnContainer.append(statusBlock);

  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'modal-detail-button-container';
  modalDetailContainer.append(buttonsContainer);

  const buttonCancel = document.createElement('div');
  buttonCancel.className = 'button-cancel';
  buttonCancel.innerHTML = 'Close';
  buttonsContainer.append(buttonCancel);

  buttonCancel.addEventListener('click', function () {
    modalDetailContainer.remove();
    mainModalContainer.classList.remove('window-inactive');
  })


  const buttonSave = document.createElement('div');
  buttonSave.className = 'button-save';
  buttonSave.innerHTML = 'Save';
  buttonsContainer.append(buttonSave);

  //обрабочик на save
  buttonSave.addEventListener('click', function () {
    let newDescr =  descrTextarea.value;
    let newUser = userSelectButton.innerHTML;
    todo.title = newDescr;

    if(isNew) {
      tasksFromLS.unshift(todo);
    }
    setItemToLS('tasks', tasksFromLS);
    appendTasksInColumns();
    counterTasks();
    modalDetailContainer.remove();
    mainModalContainer.classList.remove('window-inactive');
    
  })

  return modalDetailContainer;
}