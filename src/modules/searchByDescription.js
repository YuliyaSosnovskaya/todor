import {setSearchParams,deleteSearchParams,getSearchParams} from '../utils/search-params.js';
import {appendTasksInColumns} from './columns.js';
import {addTasksToDeletedColumn} from './deleted-column.js';
//создаем поле поиска по description
export function createSearchDesc () {
  const descContainer = document.createElement('div');
  descContainer.className = 'desc-container';

  const searchImg = document.createElement('img');
  searchImg.src = './img/search.png';
  searchImg.className = 'search-img';
  descContainer.append(searchImg);

  const descInput = document.createElement('input');
  descInput.className = 'desc-input';
  descInput.setAttribute('placeholder','type a description...');
  descInput.type = 'text';
  descInput.id = 'descInput';
  descContainer.append(descInput);

  //достаем desc Из SP(url)
  let descFromSP = getSearchParams('desc');
  //задаем значение из SP(при перезагрузке чтобы не терялся поиск)
  descInput.value = descFromSP;
  //обработчик при вводе в поле поиска 
  descInput.addEventListener('input', function (event) {
    let inside = descInput.value;
    if (inside.length != 0) {
      setSearchParams('desc', inside);
      appendTasksInColumns();
      addTasksToDeletedColumn();
    }else {
      deleteSearchParams('desc');
      appendTasksInColumns();
      addTasksToDeletedColumn();
    
    }
    
  })
  
  return descContainer;
}