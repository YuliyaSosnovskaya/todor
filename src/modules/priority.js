import {setSearchParams, deleteSearchParams, getSearchParams} from '../utils/search-params.js';
import {appendTasksInColumns} from './columns.js';
import {addTasksToDeletedColumn} from './deleted-column.js';
import createSelect from './select-field.js';

const optionsList = ['all','low','middle','height'];

export function createPrioritySelect() {
  const priorityContainer = document.createElement('div');
  priorityContainer.className = 'priority-container';

  const labelEl = document.createElement('span');
  labelEl.className = 'priority-span';
  labelEl.innerHTML = 'Priority';
  priorityContainer.append(labelEl);

  const priorityFromSp =  getSearchParams('priority');
  const priorityValue = priorityFromSp ? priorityFromSp : 'all';
  
  const selectDOMEl = createSelect(
    priorityValue,
    optionsList,
    function(newValue) {
      if (newValue === 'all') {
        deleteSearchParams('priority');
      } else {
        setSearchParams('priority', newValue);
      }
      appendTasksInColumns();
      addTasksToDeletedColumn();
    });
  priorityContainer.append(selectDOMEl);

  return priorityContainer;
}
