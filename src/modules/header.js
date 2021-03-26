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

  const userName = document.createElement('div');
  userName.className = 'hello';
  userName.innerHTML = 'Hi, Yuliya';
  containerForLogIn.prepend(userName);

  buttonLogIn.innerHTML = 'log out';
  
  containerForLogIn.append(buttonLogIn);
  mainContainer.prepend(header);
}