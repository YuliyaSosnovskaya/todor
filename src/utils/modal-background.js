const mainModalContainer = document.getElementById('mainModalContainer');
//при клике на серую тень удаяется mainModalContainer и убирается тень   
mainModalContainer.addEventListener('click', () => {
  document.getElementById('modal-window').remove();
  hideModalBackground();
});
//показываем серую тень
export const showModalBackground = () => {
  mainModalContainer.style.display = 'block';
}
//убираем серую тень 
export const hideModalBackground = () => {
  mainModalContainer.style.display = 'none';
}
