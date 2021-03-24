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


  options.forEach(optionValue => {
    const optionEl = document.createElement('div');
    optionEl.className = 'select-option';
    optionEl.innerHTML = optionValue.toLowerCase();
    selectOptionsContainer.append(optionEl);

    optionEl.addEventListener('click', function() {
      if (selectedValue !== optionValue) {
        selectButton.innerHTML = optionValue.toLowerCase();
        selectedValue = optionValue;
        onSelect && onSelect(optionValue);
      }
      selectOptionsContainer.classList.remove('select-options');
    })
  });

  selectButton.addEventListener('click', function() {
    if (!document.getElementsByClassName('select-options')[0]) {
      selectOptionsContainer.classList.add('select-options');
    } else {
      selectOptionsContainer.classList.remove('select-options');
    }
  });

  return selectContainer;
}
