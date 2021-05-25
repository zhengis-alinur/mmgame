import './styles.scss';
import { App } from './app';
import { Header } from './components/header/header';
import { About } from './components/about/about';
import { Score } from './components/score/score';
import { Settings } from './components/settings/settings';
import { NavItem } from './components/header/nav-item';
import { RegisterPopUp } from './components/registerPopUp/registerPopUp';
import { IDB } from './database/IDB';

// function, which gets two params 1st - tag name, 2nd - class name, and returns HTML element.
function createElem(tag: keyof HTMLElementTagNameMap, className: string) {
  const elem = document.createElement(tag);
  elem.classList.add(className);
  return elem;
}

// function, which changes the content of base html element with inner html element.
// button is inactive if you are in that inner page already
// For expample, if you are in About page, AboutButton is not active, so you cannot press it.
function changeAppContent(base: HTMLElement, innerElem: HTMLElement, button: NavItem) {
  base.innerHTML = '';
  base.appendChild(innerElem);
  button.isActive = true;
}

// create app and pages. Append only aboutPage, because initially when we open web-site, we must be in aboutPage.
const app = createElem('div', 'app');
const aboutPage = new About();
const settingsPage = new Settings();
const scorePage = new Score();
app.appendChild(aboutPage.element);
window.history.pushState({}, 'about', '#/about/');

// create header
const header = new Header();

// match pages to buttons in navigation menu
header.aboutBtn.element.addEventListener('click', () => {
  if (header.aboutBtn.isActive) {
    window.history.pushState({}, 'about', '#/about/');
    changeAppContent(app, aboutPage.element, header.aboutBtn);
  }
});
header.scoreBtn.element.addEventListener('click', () => {
  if (header.scoreBtn.isActive) {
    window.history.pushState({}, 'score', '#/score/');
    changeAppContent(app, scorePage.element, header.scoreBtn);
  }
});
header.settingsBtn.element.addEventListener('click', () => {
  if (header.settingsBtn.isActive) {
    window.history.pushState({}, 'settings', '#/settings/');
    changeAppContent(app, settingsPage.element, header.settingsBtn);
  }
});

// add eventlistener for window, which changes the content of app element according to url request
window.addEventListener('hashchange', () => {
  const location = window.location.hash;
  switch (location) {
    case '#/about/': {
      changeAppContent(app, aboutPage.element, header.aboutBtn);
      break;
    }
    case '#/score/': {
      changeAppContent(app, scorePage.element, header.scoreBtn);
      break;
    }
    case '#/settings/': {
      changeAppContent(app, settingsPage.element, header.settingsBtn);
      break;
    }
    default: break;
  }
  if (location !== '#/about/' && location !== '#/score/' && location !== '#/settings/') {
    window.location.href = '***';
  }
});

// create register popup menu
const cover = createElem('div', 'cover');
const registerPopUp = new RegisterPopUp();
document.body.appendChild(cover);
document.body.appendChild(registerPopUp.element);
header.registerBtn.addEventListener('click', () => {
  registerPopUp.element.style.display = 'flex';
  cover.style.display = 'block';
});
cover.addEventListener('click', () => {
  registerPopUp.element.style.display = 'none';
  cover.style.display = 'none';
});
registerPopUp.cancelBtn.addEventListener('click', () => {
  registerPopUp.element.style.display = 'none';
  cover.style.display = 'none';
});

// create IndexedDB
const db = new IDB();
registerPopUp.addUserBtn.addEventListener('click', () => {
  const name = (<HTMLInputElement>document.getElementById('name-input')).value;
  const surname = (<HTMLInputElement>document.getElementById('surname-input')).value;
  const email = (<HTMLInputElement>document.getElementById('email-input')).value;
  console.log(name, surname, email);
  db.addUser(name, surname, email);
});

// const application = new App(app);
// application.start();

document.body.appendChild(header.element);
document.body.appendChild(app);
