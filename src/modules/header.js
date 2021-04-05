import {hideModalBackground, showModalBackground} from '../utils/modal-background.js';
import passwords from '../../passwords.js';
import {setItemToLS, getItemFromLS,removeItemFromLS} from '../utils/local-storage.js';

export function createHeader () {
  const mainContainer = document.getElementById('main-container');
  const header = document.createElement('div');
  header.className = 'header';

  const logo = document.createElement('div');
  logo.className = 'logo';
  logo.innerHTML = 'ToDor';
  header.append(logo);

  const containerForLogIn = document.createElement('div');
  containerForLogIn.className = 'container-for-login';
  header.append(containerForLogIn);

  const buttonLogIn = document.createElement('div');
  buttonLogIn.className = 'button-login';
  buttonLogIn.id = 'loginButton';

  const userName = document.createElement('div');
  userName.className = 'hello';
  userName.id = 'logoName';
  buttonLogIn.innerHTML = 'log in';
  //если выполнен вход то добавляем приветствие и меняем на log out
  const name = getItemFromLS('auth');
  if (name) {
    userName.innerHTML = `Hi, ${name}`;
    buttonLogIn.innerHTML = 'log out';
  };
 
  containerForLogIn.prepend(userName);
  //при клике на кнопку logIn
  buttonLogIn.addEventListener('click',function () {
    // проверить если auth что-то хранит
    // если да, то меняет на Log out и удаляем приветствие и удаляем auth из ls и return
    // иначе все остальное
    const authFromLs = getItemFromLS('auth');
    if (authFromLs) {
      userName.innerHTML = '';
      buttonLogIn.innerHTML = 'log in';
      removeItemFromLS('auth');
      return;
    };
    createAndAppendLogoModal();
    showModalBackground();
  })
  
  containerForLogIn.append(buttonLogIn);
  mainContainer.prepend(header);
  //add lamp
  dayNight();
}

function createAndAppendLogoModal() {
  const modalContainer = document.createElement('div');
  modalContainer.className = 'logo-modal-container';
  const nickContainer = document.createElement('div');
  nickContainer.className = 'logo-containers';
  const passwordContainer = document.createElement('div');
  passwordContainer.className = 'logo-containers';

  const nickLabel = document.createElement('div');
  nickLabel.innerHTML = 'Nickname';
  nickLabel.className = 'nick-label';
  nickContainer.append(nickLabel);

  const nickInput =  document.createElement('input');
  nickInput.className = 'nick-input';
  nickContainer.append(nickInput);
  //убираем текст ошибки при вводе 
  nickInput.addEventListener('input', function () {
    nickErrorSpan.classList.remove('visible-error-span');
  });

  const nickErrorSpan = document.createElement('span');
  nickErrorSpan.className = 'hide-error-span';
  nickErrorSpan.innerHTML = 'error';
  nickContainer.append(nickErrorSpan);

  const passLabel = document.createElement('div');
  passLabel.innerHTML = 'Password';
  passLabel.className = 'nick-label';
  passwordContainer.append(passLabel);

  const passInput = document.createElement('input');
  passInput.className = 'nick-input';
  passInput.setAttribute('type', 'password');
  passwordContainer.append(passInput);
  //убираем текст ошибки при вводе 
  passInput.addEventListener('input',function () {
    passErrorSpan.classList.remove('visible-error-span');
  })  

  const passErrorSpan = document.createElement('span');
  passErrorSpan.className = 'hide-error-span';
  passErrorSpan.innerHTML = 'error';
  passwordContainer.append(passErrorSpan);

  modalContainer.append(nickContainer);
  modalContainer.append(passwordContainer);

  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'modal-detail-button-container';
  modalContainer.append(buttonsContainer);

  const buttonCancel = document.createElement('div');
  buttonCancel.className = 'button-cancel';
  buttonCancel.innerHTML = 'Close';
  buttonsContainer.append(buttonCancel);
  //закрываем модалку на cancel
  buttonCancel.addEventListener('click', function () {
    modalContainer.remove();
    hideModalBackground();
  })

  const buttonLogIn = document.createElement('div');
  buttonLogIn.className = 'button-save';
  buttonLogIn.innerHTML = 'Log in';
  buttonsContainer.append(buttonLogIn);
  //обработчик на LOGIN
  buttonLogIn.addEventListener('click', function () {
    const nickname = nickInput.value;
    const password = passInput.value;
  
    // nickname validation
    if(nickname.length == 0) {
      nickErrorSpan.innerHTML = 'nickname is required';
      nickErrorSpan.classList.add('visible-error-span');
      return;
    }
    //проверяем есть ли user c таким nickname
    const p = passwords[nickname];
    //если нет то выводим ошибку что такого нет
    if(!p){
      nickErrorSpan.innerHTML = 'unknown nickname';
      nickErrorSpan.classList.add('visible-error-span');
      return;
    }

    // password validation
    if(password.length == 0) {
      passErrorSpan.innerHTML = 'password is required';
      passErrorSpan.classList.add('visible-error-span');
      return;
    }
    //если пароль не совпадает то выводи ошибку
    if(p !== password) {
      passErrorSpan.innerHTML = 'password is wrong';
      passErrorSpan.classList.add('visible-error-span');
      return;
    }
    //добавляем auth в LS 
    setItemToLS('auth', nickname);
    const greetingDomEl = document.getElementById('logoName');
    greetingDomEl.innerHTML = `Hi, ${nickname}`;
    //меняем login на logout
    const loginButton = document.getElementById('loginButton');
    loginButton.innerHTML = 'Log out';
    //удаляем модалку и серую тень
    modalContainer.remove();
    hideModalBackground();
  })
  modalContainer.id = 'modal-window';
  document.body.append(modalContainer);
}
//тема по умолчанию
let theme = 'day';

export function dayNight () {
  const header = document.getElementsByClassName('container-for-login')[0];
  const icon = document.createElement('img');
  icon.setAttribute('src','../../img/day.png');
  icon.className = 'icon';
  header.append(icon);
  //обработчик на клик lamp
  icon.addEventListener('click', function () {
    const priority = document.getElementsByClassName('priority-span')[0];
    const toggle = document.getElementsByClassName('span-checkbox')[0];
    const logo = document.getElementsByClassName('logo')[0];
    const loginButton = document.getElementById('loginButton');
    //если тема день то меняем ее на клик на ночь и меняем стили для некоторых деталей 
    if (theme == 'day') {
      theme = 'night';
      document.body.classList.add('body-night');
      icon.setAttribute('src','../../img/night.png');
      priority.classList.add('text-night');
      toggle.classList.add('text-night');
      logo.classList.add('text-night');
      loginButton.classList.add('text-night');
      return;
    }
    //иначе меняем тему на день и удаляем стили 
    theme = 'day';
    document.body.classList.remove('body-night');
    icon.setAttribute('src','../../img/day.png');
    priority.classList.remove('text-night');
    toggle.classList.remove('text-night');
    logo.classList.remove('text-night');
    loginButton.classList.remove('text-night');
    
  })

}