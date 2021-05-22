import './styles.scss';
import { App } from './app';
import { Header } from './components/header/header';
import { About } from './components/about/about';
import { Score } from './components/score/score';
import { Settings } from './components/settings/settings';
import { NavItem } from './components/header/nav-item';
import { BaseComponent } from './components/base-component';

function createElem(tag: keyof HTMLElementTagNameMap, className: string) {
  const elem = document.createElement(tag);
  elem.classList.add(className);
  return elem;
}

function tileBtnPage(btn: NavItem, page: BaseComponent) {
  if (btn.isActive) {

  }
}

window.onload = () => {
  // create app
  const app = createElem('div', 'app');
  const aboutPage = new About();
  const settingsPage = new Settings();
  const scorePage = new Score();
  app.appendChild(aboutPage.element);
  // create header
  const header = new Header();
  header.createCenter();
  header.aboutBtn.element.addEventListener('click', () => {
    if (header.aboutBtn.isActive) {
      app.innerHTML = '';
      app.appendChild(aboutPage.element);
    }
  });
  header.scoreBtn.element.addEventListener('click', () => {
    if (header.scoreBtn.isActive) {
      app.innerHTML = '';
      app.appendChild(scorePage.element);
    }
  });
  header.settingsBtn.element.addEventListener('click', () => {
    if (header.settingsBtn.isActive) {
      app.innerHTML = '';
      app.appendChild(settingsPage.element);
    }
  });

  // const application = new App(app);
  // application.start();

  document.body.appendChild(header.element);
  document.body.appendChild(app);
};
