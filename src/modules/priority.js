 import {setSearchParams, deleteSearchParams, getSearchParams} from '../utils/search-params.js';
 import {appendTasksInColumns} from './columns.js';
 import {addTasksToDeletedColumn} from './deleted-column.js';

 export function createPrioritySelect (optionsList) {
  const priorityContainer = document.createElement('div');
  priorityContainer.className = 'priority-container';

  const prioritySpan = document.createElement('span');
  prioritySpan.className = 'priority-span';
  prioritySpan.innerHTML = 'Priority';
  priorityContainer.append(prioritySpan);

  const commonDiv = document.createElement('div');
  commonDiv.className = 'common-div';
  priorityContainer.append(commonDiv);

  const priorityButton =  document.createElement('div');
  priorityButton.className = 'priority-button';
  priorityButton.id = 'priorityButton';
  const priorityFromSp =  getSearchParams('priority');

  priorityButton.innerHTML = priorityFromSp ? priorityFromSp : 'all';
  commonDiv.append(priorityButton);
  

  const commonDivForSelect = document.createElement('div');
  commonDivForSelect.id = 'commonDivForSelect';
  commonDivForSelect.className = 'common-div-for-select-none';
  commonDiv.append(commonDivForSelect);

  optionsList.forEach(select => {
    const selectEl = document.createElement('div');
    selectEl.className = 'select';
    selectEl.innerHTML = select;
    commonDivForSelect.append(selectEl);

    selectEl.addEventListener('click', function () {
      const priorityFromSp = getSearchParams('priority') || 'all';
      if (priorityFromSp !== select) {
        priorityButton.innerHTML = select;
        if (select === 'all') {
          deleteSearchParams('priority');
        } else {
          setSearchParams('priority', select);
        }
        appendTasksInColumns();
        addTasksToDeletedColumn();
        
      }
      commonDivForSelect.classList.remove('common-div-for-select');
    })

  });

  priorityButton.addEventListener('click', function () {
    if(!document.getElementsByClassName('common-div-for-select')[0]) {
      debugger;
      commonDivForSelect.classList.add('common-div-for-select');
    }else {
      commonDivForSelect.classList.remove('common-div-for-select');
    }
    
  })

return priorityContainer;
}








const priorityButton = document.getElementById('priorityButton');
const commonDivForSelect = document.getElementById('commonDivForSelect');


 
