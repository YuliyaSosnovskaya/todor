const mainModalContainer = document.getElementById('mainModalContainer');

mainModalContainer.addEventListener('click', () => {
  document.getElementById('modal-window').remove();
  hideModalBackground();
});

export const showModalBackground = () => {
  mainModalContainer.style.display = 'block';
}

export const hideModalBackground = () => {
  mainModalContainer.style.display = 'none';
}
