export function getSearchParams (key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

export function setSearchParams (key, value) {
  const params = new URLSearchParams(window.location.search);
  params.set(key, value);
  const {origin, pathname} = document.location;
  const url = origin + pathname + '?' + params.toString();

  history.pushState({[key]: value}, '', url); // change url without page reloading
}

export function deleteSearchParams (key) {
  const params = new URLSearchParams(window.location.search);
  params.delete(key);
  const {origin, pathname} = document.location;
  const newParamsString = params.toString();
  if (newParamsString === '') {
    history.pushState({}, '', `${origin}${pathname}`);
  } else {
    history.pushState({}, '', `${origin}${pathname}?${newParamsString}`);
  }
}
