import './styles.scss';
import { App } from './app';
import { Header } from './components/header/header';
import { About } from './components/about/about';
import { Score } from './components/score/score';
import { Settings } from './components/settings/settings';
import { NavItem } from './components/header/nav-item';
import { RegisterPopUp } from './components/registerPopUp/registerPopUp';
import { IDB } from './database/IDB';
import { Player } from './database/player';
import { createElem } from './shared/createElem';

let isRegistered = false;
let currentPlayer: Player;
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

// start game. timeDisplay - is html elem to display time
const timeDisplay = createElem('div', 'time-display');
const minutesHolder = createElem('p', 'minutes');
minutesHolder.innerHTML = '00';
const ddot = createElem('p', 'ddot');
ddot.innerHTML = ':';
const secondsHolder = createElem('p', 'seconds');
secondsHolder.innerHTML = '00';
timeDisplay.append(minutesHolder);
timeDisplay.append(ddot);
timeDisplay.append(secondsHolder);

// time renewer function
function renewTime(gameTime: number) {
  const seconds = gameTime % 60;
  const minutes = Math.floor(gameTime / 60);
  console.log(minutes, seconds);
  if (seconds / 10 >= 1) {
    secondsHolder.innerHTML = `${seconds}`;
  } else {
    secondsHolder.innerHTML = `0${seconds}`;
  }
  if (minutes / 10 >= 1) {
    minutesHolder.innerHTML = `${minutes}`;
  } else {
    minutesHolder.innerHTML = `0${minutes}`;
  }
}

let time = 0;
let stopWatch: NodeJS.Timeout;

function stopTimer() {
  if (stopWatch) {
    time = 0;
    clearInterval(stopWatch);
    renewTime(0);
  }
}

// create IndexedDB
const db = new IDB();

// create header
const header = new Header();

// match pages to buttons in navigation menu
header.aboutBtn.element.addEventListener('click', () => {
  if (header.aboutBtn.isActive) {
    header.setStyleNavItem(header.aboutBtn);
    stopTimer();
    window.history.pushState({}, 'about', '#/about/');
    changeAppContent(app, aboutPage.element, header.aboutBtn);
  }
});
header.scoreBtn.element.addEventListener('click', () => {
  if (header.scoreBtn.isActive) {
    header.setStyleNavItem(header.scoreBtn);
    stopTimer();
    scorePage.recordHolder.innerHTML = '';
    db.displayFirstN(scorePage, 10);
    window.history.pushState({}, 'score', '#/score/');
    changeAppContent(app, scorePage.element, header.scoreBtn);
  }
});
header.settingsBtn.element.addEventListener('click', () => {
  if (header.settingsBtn.isActive) {
    header.setStyleNavItem(header.settingsBtn);
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
      // make darker bgcolor of button in navMenu, if we in that page
      header.setStyleNavItem(header.aboutBtn);
      stopTimer();
      changeAppContent(app, aboutPage.element, header.aboutBtn);
      break;
    }
    case '#/score/': {
      header.setStyleNavItem(header.scoreBtn);
      stopTimer();
      db.getPlayers();
      changeAppContent(app, scorePage.element, header.scoreBtn);
      break;
    }
    case '#/settings/': {
      header.setStyleNavItem(header.settingsBtn);
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
  const nameInput = (<HTMLInputElement>document.getElementById('name-input'));
  const surnameInput = (<HTMLInputElement>document.getElementById('surname-input'));
  const emailInput = (<HTMLInputElement>document.getElementById('email-input'));

  if (nameInput.validity.valid && surnameInput.validity.valid && emailInput.validity.valid) {
    // add Player into IndexedDB
    currentPlayer = new Player(nameInput.value, surnameInput.value, emailInput.value);
    db.addPlayer(currentPlayer);

    // hide registerPopUp Menu
    registerPopUp.element.style.display = 'none';
    cover.style.display = 'none';

    // add start button
    header.right.innerHTML = '';
    if (window.location.hash === '#/settings/') {
      header.right.appendChild(header.startBtn);
    }
    isRegistered = true;
  }
});

// add Eventlistener to Start Butto
header.startBtn.addEventListener('click', () => {
  // click on Start button start stopWatch or reset it, if stopWatch is undefined
  stopTimer();
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
  stopWatch = setInterval(() => {
    time++;
    renewTime(time);
  }, 1000);

  document.body.append(timeDisplay);
});

function congratulations(score: number) {
  const congratTextHolder = createElem('div', 'congrat-text-holder');
  const congratText = createElem('p', 'congrat-text');
  congratText.innerHTML = 'Congratulations! You have found all pairs and get';
  const scoreText = createElem('p', 'score-text');
  scoreText.innerHTML = `${score} points`;
  app.innerHTML = '';
  congratTextHolder.append(congratText);
  congratTextHolder.append(scoreText);
  app.append(congratTextHolder);
}

// in Game class in cardHandler() function we dispatch CustomEvent('game-finish') if it is found all pairs.
// here written a function for this Event.
document.body.addEventListener('game-finish', () => {
  // clear timeInterval, and reset time variable.
  document.body.removeChild(timeDisplay);
  const score = application.game.getMatchesScore() - time * 10;
  stopTimer();
  congratulations(score);
  db.renewScore(currentPlayer, score);
});

document.body.appendChild(header.element);
document.body.appendChild(app);
