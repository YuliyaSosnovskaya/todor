
export function createSearchUsers (user) {
  
  const userEl = document.createElement('div');
  const containerForAvatar = document.createElement('div');
  const avatar = document.createElement('img');
  const nameUser = document.createElement('p');


  
  userEl.className = 'search-user';
  avatar.className = 'search-avatar';

  avatar.setAttribute('src', user.avatar);
  containerForAvatar.className = 'container-for-avatar';
  nameUser.className = 'name-search-user';
  nameUser.innerHTML = user.name;
  userEl.id = `${user.name}-${user.id}`;
  containerForAvatar.append(avatar);
  userEl.append( containerForAvatar);
  userEl.append(nameUser);
  return userEl;
}
