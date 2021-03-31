export function setItemToLS (key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

export function getItemFromLS (key) {
  return JSON.parse(localStorage.getItem(key));
}
export function removeItemFromLS(key) {
  localStorage.removeItem(key);
}