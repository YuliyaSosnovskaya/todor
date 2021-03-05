

export function createColumns () {
  const mainColumnContainer = document.createElement('div');
  const toDoColumn = document.createElement('div');
  const toDoNameContainer = document.createElement('div');
  const ToDoName = document.createElement('div');
  const plusIcon = document.createElement('img');
  const colorToDoContainer = document.createElement('div');
  const inProgressColumn = document.createElement('div');
  const inProgressNamecontainer = document.createElement('div');
  const inProgressName = document.createElement('div');
  const colorInProgressColumn = document.createElement('div');
  const doneColumn = document.createElement('div');
  const doneNamecontainer = document.createElement('div');

  const doneName = document.createElement('div');
  const colorDoneColumn = document.createElement('div');
  const counterToDo = document.createElement('div');
  const counterInProgress = document.createElement('div');
  const counterDone = document.createElement('div');


  mainColumnContainer.className = 'main-column-container';
  toDoColumn.className = 'todo-column';
  toDoColumn.id = 'toDoColumn';
  toDoNameContainer.className = 'todo-name-container';

  counterToDo.className = 'counter';
  counterToDo.id = 'counterToDo';
  toDoNameContainer.append(counterToDo);

  counterInProgress.className = 'counter counter-inprogress';
  counterInProgress.id = 'counterInProgress';
  inProgressNamecontainer.className = 'inprogress-name-container';
  inProgressNamecontainer.append(counterInProgress);


  counterDone.className = 'counter counter-done';
  counterDone.id = 'counterDone';
  doneNamecontainer.className = 'inprogress-name-container';

  doneNamecontainer.append(counterDone);
  doneNamecontainer.append(doneName);


  

  ToDoName.className = 'column-name';
  ToDoName.innerHTML = 'TO DO';
  plusIcon.setAttribute('src','img/svg');
  plusIcon.className = 'plus-icon';
  colorToDoContainer.className = 'column column-task-container1';
  colorToDoContainer.id = 'toDo';
  inProgressColumn.className = 'inprogress-column';
  inProgressColumn.id = 'inProgressColumn';
  inProgressName.className = 'column-name';
  inProgressName.innerHTML = 'IN PROGRESS';
  colorInProgressColumn.className = 'column column-task-container2';
  colorInProgressColumn.id = 'inProgress';
  doneColumn.className = 'done-column';
  doneColumn.id = 'doneColumn';
  doneName.className = 'column-name';
  doneName.innerHTML = 'DONE';
  colorDoneColumn.className = 'column column-task-container3';
  colorDoneColumn.id = 'done';

  toDoNameContainer.append(ToDoName);
  toDoNameContainer.append(plusIcon);
  toDoColumn.append(toDoNameContainer);
  toDoColumn.append(colorToDoContainer);
  inProgressNamecontainer.append(inProgressName);
  inProgressColumn.append(inProgressNamecontainer);
  inProgressColumn.append(colorInProgressColumn);
  doneColumn.append(doneNamecontainer);
  doneColumn.append(colorDoneColumn);

  mainColumnContainer.append(toDoColumn);
  mainColumnContainer.append(inProgressColumn);
  mainColumnContainer.append(doneColumn);
  return mainColumnContainer;
}