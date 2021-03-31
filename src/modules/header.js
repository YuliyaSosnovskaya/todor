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

  const name = getItemFromLS('auth');
  if(name) {
    userName.innerHTML = `Hi, ${name}`;
    buttonLogIn.innerHTML = 'log out';
  };
 
  containerForLogIn.prepend(userName);

  buttonLogIn.addEventListener('click',function () {
    // проверить если auth что-то хранит
    // если да, то меняет на Log out и удаляем приветствие и удаляем auth из ls и return
    // иначе все остальное
    const authFromLs = getItemFromLS('auth');
    if(authFromLs) {
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
    const p = passwords[nickname];
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
    if(p !== password) {
      passErrorSpan.innerHTML = 'password is wrong';
      passErrorSpan.classList.add('visible-error-span');
      return;
    }
    
    setItemToLS('auth', nickname);
    const greetingDomEl = document.getElementById('logoName');
    greetingDomEl.innerHTML = `Hi, ${nickname}`;

    const loginButton = document.getElementById('loginButton');
    loginButton.innerHTML = 'Log out';

    modalContainer.remove();
    hideModalBackground();
  })

  document.body.append(modalContainer);
}