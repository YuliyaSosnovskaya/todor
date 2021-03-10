import users from '../../users.js';

import {addTasksToDeletedColumn, counterForDeletedColumn} from './deleted-column.js';
import {getSearchParams, setSearchParams, deleteSearchParams} from '../utils/search-params.js';
import {counterTasks} from './tasks.js';
import {appendTasksInColumns} from './columns.js';

function createUserElement(user) {
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
  userEl.append(containerForAvatar);
  userEl.append(nameUser);

  avatar.draggable = false;

  return userEl;
}

export default function createAndAppendUsersSearchPanel() {
  const usersSearchPanel = document.getElementById('sort-container');

  const allUsersEl = createUserElement(
    {
      name: 'All',
      avatar: 'img/team1.png',
      id: 0
    }
  );
  usersSearchPanel.append(allUsersEl);

  users.forEach(user => {
    const userDOMEl = createUserElement(user);
    usersSearchPanel.append(userDOMEl);
  });

  // set styles for init filter user
  const filterUserId = Number(getSearchParams('byUser'));

  // изначальное подсвечивание avatar у юзера совподающего по byUser из URL (filterUserId выше)
  // 1. находим нужного юзера из списка юзеров (нашего файла) по filterUserId (byUser из URL)
  const filterUserObj = users.find((user => user.id === filterUserId));
  // 2. воссоздаем "id" attribute userEl которого надо подсветить 
  let userElIdAttribute = filterUserObj ? `${filterUserObj.name}-${filterUserObj.id}` : 'All-0';
  // 3. находим userEl которого надо подсветить по воссозданному "id" attribute
  const filterUserDOMEl = document.getElementById(userElIdAttribute);
  // 4. подсвечиваем avatar у найденного юзера (filterUserDOMEl)
  filterUserDOMEl.getElementsByClassName('container-for-avatar')[0].classList.add('container-for-avatar-hover');

  // set events handlers (обработчики событий) to all users elements
  const usersElements = document.getElementsByClassName('search-user');
  for (let userEl of usersElements) {
    userEl.addEventListener('mouseover', function () {
      if (userEl.id === userElIdAttribute) return;
      const avatarEl = userEl.getElementsByClassName('container-for-avatar')[0];
      avatarEl.classList.add('container-for-avatar-hover');
    });
    userEl.addEventListener('mouseout', function (event) {
      if (userEl.id === userElIdAttribute) return;
      const avatarEl = userEl.getElementsByClassName('container-for-avatar')[0];
      avatarEl.classList.remove('container-for-avatar-hover');
    });
    userEl.addEventListener('click', function () {
      // если кликнули по новому юзеру
      if (userElIdAttribute !== userEl.id) {
        // удаляем со старого юзера подсветку
        const activeUserEl = document.getElementById(userElIdAttribute);
        const activeUserAvatar = activeUserEl.getElementsByClassName('container-for-avatar')[0];
        activeUserAvatar.classList.remove('container-for-avatar-hover');

        userElIdAttribute = userEl.id;

        // меняем byUser в URL
        const userId = userElIdAttribute.split('-')[1];
        if (Number(userId)) {
          setSearchParams('byUser', Number(userElIdAttribute.split('-')[1]));
        } else {
          deleteSearchParams ('byUser');
        }

        // подсвечиваем нового юзера
        const avatarEl = userEl.getElementsByClassName('container-for-avatar')[0];
        avatarEl.classList.add('container-for-avatar-hover');

        // перерендериваем данные в колонках
        appendTasksInColumns();
        addTasksToDeletedColumn();
        counterTasks ();
        counterForDeletedColumn();
      }
    })
  }
}
