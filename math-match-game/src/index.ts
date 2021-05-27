import './styles.scss';
import { App } from './app';
import { Header } from './components/header/header';
import { About } from './components/about/about';
import { Score } from './components/score/score';
import { Settings } from './components/settings/settings';
import { NavItem } from './components/header/nav-item';
import { RegisterPopUp } from './components/registerPopUp/registerPopUp';
import { IDB } from './database/IDB';

let isRegistered = false;
let currentPlayer?: Player;

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
let application: App;
const app = createElem('div', 'app');
const aboutPage = new About();
const settingsPage = new Settings();
const scorePage = new Score();
let cardType = 'animals';
let difficulty = '4';
app.appendChild(aboutPage.element);
window.history.pushState({}, 'about', '#/about/');

// create IndexedDB
const db = new IDB();

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
    if (isRegistered) {
      header.right.appendChild(header.startBtn);
    }
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
      if (isRegistered) {
        header.right.appendChild(header.startBtn);
      }
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
registerPopUp.addUserBtn.addEventListener('click', () => {
  // get values from form
  const name = (<HTMLInputElement>document.getElementById('name-input')).value;
  const surname = (<HTMLInputElement>document.getElementById('surname-input')).value;
  const email = (<HTMLInputElement>document.getElementById('email-input')).value;

  // add Player into IndexedDB
  db.addPlayer(name, surname, email);

  // hide registerPopUp Menu
  registerPopUp.element.style.display = 'none';
  cover.style.display = 'none';

  // add start button
  header.right.innerHTML = '';
  if (window.location.hash === '#/settings/') {
    header.right.appendChild(header.startBtn);
  }
  isRegistered = true;
});

// start game. timeDisplay - is html elem to display time
const timeDisplay = document.body.appendChild(document.createTextNode(''));
let time = 0;
let a: NodeJS.Timeout;
// add Eventlistener to Start Butto
header.startBtn.addEventListener('click', () => {
  // click on Start button start stopWatch or reset it, if stopWatch is undefined
  if (a) {
    time = 0;
    clearInterval(a);
    timeDisplay.textContent = '0';
  }
  // if start button is clicked in Settings page, where we have access to CardType, Difficulty selects,
  // document.getElementById('select-card') and document.getElementById('select-difficulty') returns HTMLElements,
  // else if Start Button clicked not in Settings page we initially get default values of game Settings, or if
  // settings button clicks not first time, it gets previous values of settings for game.
  // (<HTMLInputElement>document.getElementById('select-card')).value returns animal/it-companies
  // (<HTMLInputElement>document.getElementById('select-difficulty')).value returns 4/6/8  (4 - 4x4, 6 - 6x6 e.t.c)
  if (<HTMLInputElement>document.getElementById('select-card')) {
    cardType = (<HTMLInputElement>document.getElementById('select-card')).value;
    difficulty = (<HTMLInputElement>document.getElementById('select-difficulty')).value;
  }
  application = new App(app);
  application.start(cardType, difficulty);
  // add address into hash
  window.history.pushState({}, 'game', '#/game/');

  // start timeDisplay, which renew text into timeDisplay every second
  a = setInterval(() => {
    time++;
    timeDisplay.textContent = `${time.toString(10)} s`;
  }, 1000);
});

// in Game class in cardHandler() function we dispatch CustomEvent('game-finish') if it is found all pairs.
// here written a function for this Event.
document.body.addEventListener('game-finish', () => {
  // clear timeInterval, and reset time variable.
  if (a) {
    clearInterval(a);
    timeDisplay.textContent = '0';
  }

  app.innerHTML = `Congratulations! You have found all pairs! in ${time} seconds`;
  db.addRecord('', time);
  time = 0;
  // here will be a function which loads data(game-record for current User) into IndexedDB.
});

document.body.appendChild(header.element);
document.body.appendChild(app);
