import './header.scss';
import { BaseComponent } from '../base-component';
import { NavItem } from './nav-item';
import { About } from '../about/about';
import { Score } from '../score/score';
import { Settings } from '../settings/settings';

function createElem(tag: keyof HTMLElementTagNameMap, className: string) {
  const elem = document.createElement(tag);
  elem.classList.add(className);
  return elem;
}

export class Header extends BaseComponent {
  private left?: HTMLElement;

  private center?: HTMLElement;

  public aboutBtn: NavItem = new NavItem('About', 'about.svg');

  public scoreBtn: NavItem = new NavItem('Best score', 'about.svg');

  public settingsBtn: NavItem = new NavItem('Settings', 'about.svg');

  public registerBtn: HTMLElement = document.createElement('button');

  private right?: HTMLElement;

  constructor() {
    super('header', ['header']);
    this.createLeft();
    this.createCenter();
    this.createRight();
  }

  createLeft() {
    this.left = createElem('div', 'logo');
    this.element.appendChild(this.left);
  }

  createCenter() {
    this.center = createElem('div', 'nav-menu');
    this.aboutBtn.element.classList.add('about');
    // this.aboutBtn.element.setAttribute('href', '#/about/');

    this.scoreBtn.element.classList.add('score');
    // this.scoreBtn.element.setAttribute('href', '#/score/');

    this.settingsBtn.element.classList.add('settings');
    // this.settingsBtn.element.setAttribute('href', '#/settings/');

    this.center.appendChild(this.aboutBtn.element);
    this.center.appendChild(this.scoreBtn.element);
    this.center.appendChild(this.settingsBtn.element);

    this.element.appendChild(this.center);
  }

  createRight() {
    this.right = createElem('div', 'right');
    this.registerBtn.innerHTML = 'Register new Player';
    this.registerBtn.classList.add('button');
    this.right.appendChild(this.registerBtn);
    this.element.appendChild(this.right);
  }
}
