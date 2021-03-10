export function setItemToLS (key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

export function getItemFromLS (key) {
  return JSON.parse(localStorage.getItem(key));
}