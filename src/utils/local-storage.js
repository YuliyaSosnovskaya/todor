//добавляет ключ - значение в Local Storage
export function setItemToLS (key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}
//достает значение по ключу из LS
export function getItemFromLS (key) {
  return JSON.parse(localStorage.getItem(key));
}
//удаляет значения по ключу из LS
export function removeItemFromLS(key) {
  localStorage.removeItem(key);
}