export function createColumnDelete () {
  const deletedColumn = document.createElement('div');
  const deletedNameContainer = document.createElement('div');
  const deletedName = document.createElement('div');
  const colorDeletedContainer = document.createElement('div');
  const counterDeleted = document.createElement('div');

  counterDeleted.className = 'counter';
  counterDeleted.id = 'counterDeleted';
  deletedNameContainer.append(counterDeleted);
 
  counterDeleted.innerHTML = counterDeleted.children.length;
  

  deletedColumn.className = 'deleted-column';
  deletedColumn.id = 'deletedColumn';
  deletedNameContainer.className = 'deleted-name-container';


  deletedNameContainer.append(deletedName);
  

  deletedName.className = 'column-name';
  deletedName.innerHTML = 'DELETED';
  
  colorDeletedContainer.className = 'column column-task-container4';
  colorDeletedContainer.id = 'deleted';


  deletedNameContainer.append(deletedName);
  deletedColumn.append(deletedNameContainer);
  deletedColumn.append(colorDeletedContainer);
  
  return deletedColumn ;
}