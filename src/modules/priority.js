import {setSearchParams, deleteSearchParams, getSearchParams} from '../utils/search-params.js';
import {appendTasksInColumns} from './columns.js';
import {addTasksToDeletedColumn} from './deleted-column.js';
import createSelect from './select-field.js';

const optionsList = ['all','low','middle','height'];
//создание priority select 
export function createPrioritySelect() {
  const priorityContainer = document.createElement('div');
  priorityContainer.className = 'priority-container';

  const labelEl = document.createElement('span');
  labelEl.className = 'priority-span';
  labelEl.innerHTML = 'Priority';
  priorityContainer.append(labelEl);
  //достаем priority из SP(url)
  const priorityFromSp =  getSearchParams('priority');
  //если в SP его нет то по умолчанию 'all'
  const priorityValue = priorityFromSp ? priorityFromSp : 'all';
  //создаем select для priority
  const selectDOMEl = createSelect(
    priorityValue,
    optionsList,
    //колбэк при выборе нового значение
    function(newValue) {
      //если all то удаляем из SP(url)
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
