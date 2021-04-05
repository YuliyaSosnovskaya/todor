//value - текущее значение (выбранное), options - список option  onSelect - функция колбэк при выборе другого селекта 
export default function createSelect(value, options, onSelect) {
  let selectedValue = value;
 
  const selectContainer = document.createElement('div');
  selectContainer.className = 'common-div';

  const selectButton =  document.createElement('div');
  selectButton.className = 'select-button';
  selectButton.innerHTML = selectedValue.toLowerCase();
  selectContainer.append(selectButton);

  const selectOptionsContainer = document.createElement('div');
  selectOptionsContainer.className = 'select-options-hide';
  selectContainer.append(selectOptionsContainer);
  //создаем option и добавляем в общий контейнер 
  options.forEach(optionValue => {
    const optionEl = document.createElement('div');
    optionEl.className = 'select-option';
    optionEl.innerHTML = optionValue.toLowerCase();
    selectOptionsContainer.append(optionEl);
    //при клике на  элемент 
    optionEl.addEventListener('click', function() {
      //если это новый option 
      if (selectedValue !== optionValue) {
        selectButton.innerHTML = optionValue.toLowerCase();
        selectedValue = optionValue;
        //если колбэк не передан то ничего (ошибки не будет)
        onSelect && onSelect(optionValue);
      }
      //убираем выпадающий список options
      selectOptionsContainer.classList.remove('select-options');
    })
  });
  //при клике добавляем или удаляем выпадающий список
  selectButton.addEventListener('click', function() {
    if (!document.getElementsByClassName('select-options')[0]) {
      selectOptionsContainer.classList.add('select-options');
    } else {
      selectOptionsContainer.classList.remove('select-options');
    }
  });

  return selectContainer;
}
