import users from '../../users.js';

import {addTasksToDeletedColumn, counterForDeletedColumn} from './deleted-column.js';
import {getSearchParams, setSearchParams, deleteSearchParams} from '../utils/search-params.js';
import {counterTasks} from './tasks.js';
import {appendTasksInColumns} from './columns.js';

// панель с пользователями
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
  // добавляем userEL.id состоящее из имени и id user
  userEl.id = `${user.name}-${user.id}`;
  containerForAvatar.append(avatar);
  userEl.append(containerForAvatar);
  userEl.append(nameUser);
  // не перетаскиваемый элемент avatar (у картинок по умолчанию перетаскиваемый)
  avatar.draggable = false;

  return userEl;
}

export default function createAndAppendUsersSearchPanel() {
  const usersSearchPanel = document.getElementById('sort-container');
  // создаем all user 
  const allUsersEl = createUserElement(
    {
      name: 'All',
      avatar: 'img/team1.png',
      id: 0
    }
  );
  usersSearchPanel.append(allUsersEl);
  // для каждого user создаем иконку и добавляем в панель 
  users.forEach(user => {
    const userDOMEl = createUserElement(user);
    usersSearchPanel.append(userDOMEl);
  });

  // достаём из SP(url) какой пользователь сейчас выбран 
  const filterUserId = Number(getSearchParams('byUser'));
  // set styles for init filter user
  // изначальное подсвечивание avatar у юзера совподающего по byUser из URL (filterUserId выше)
  // 1. находим нужного юзера из списка юзеров (нашего файла) по filterUserId (byUser из URL)
  const filterUserObj = users.find((user => user.id === filterUserId));
  // 2. воссоздаем "id" attribute userEl которого надо подсветить 
  let userElIdAttribute = filterUserObj ? `${filterUserObj.name}-${filterUserObj.id}` : 'All-0';
  // 3. находим userEl которого надо подсветить по воссозданному "id" attribute
  const filterUserDOMEl = document.getElementById(userElIdAttribute);
  // 4. подсвечиваем avatar у найденного юзера (filterUserDOMEl)
  filterUserDOMEl.getElementsByClassName('container-for-avatar')[0].classList.add('container-for-avatar-hover');

  
  // массив всех иконок с юзерами 
  const usersElements = document.getElementsByClassName('search-user');
  // set events handlers to all users elements
  for (let userEl of usersElements) {
    //курсор над элементом 
    userEl.addEventListener('mouseover', function () {
      // если элемент уже подсвечен (выбран) то не надо ,иначе подсвечиваем
      if (userEl.id === userElIdAttribute) return;
      const avatarEl = userEl.getElementsByClassName('container-for-avatar')[0];
      avatarEl.classList.add('container-for-avatar-hover');
    });
    //при отведении курсора 
    userEl.addEventListener('mouseout', function (event) {
      // если это с выбранного элемента то ничего не делаем, иначе удаляем подсветку
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
