import './header.scss';
import { BaseComponent } from '../base-component';
import { NavItem } from './nav-item';
import { createElem } from '../../shared/createElem';

export class Header extends BaseComponent {
  private left?: HTMLElement;

  private center?: HTMLElement;

  public aboutBtn: NavItem = new NavItem('About', 'about.svg');

  public scoreBtn: NavItem = new NavItem('Best score', 'bests.svg');

  public settingsBtn: NavItem = new NavItem('Settings', 'settings.svg');

  public registerBtn: HTMLElement = document.createElement('button');

  public startBtn: HTMLElement = document.createElement('button');

  public right: HTMLElement = createElem('div', 'right');

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
    this.aboutBtn.element.classList.add('__active');

    this.scoreBtn.element.classList.add('score');

    this.settingsBtn.element.classList.add('settings');

    this.center.appendChild(this.aboutBtn.element);
    this.center.appendChild(this.scoreBtn.element);
    this.center.appendChild(this.settingsBtn.element);

    this.element.appendChild(this.center);
  }

  createRight() {
    this.registerBtn.innerHTML = 'Register new Player';
    this.startBtn.innerHTML = 'Start game';
    this.registerBtn.classList.add('button');
    this.startBtn.classList.add('button');
    this.right.appendChild(this.registerBtn);
    this.element.appendChild(this.right);
  }

  setStyleNavItem(nav: NavItem) {
    const btns = [this.aboutBtn, this.scoreBtn, this.settingsBtn];
    btns.forEach((btn) => {
      if (btn === nav) {
        btn.element.classList.add('__active');
      } else {
        btn.element.classList.remove('__active');
      }
    });
  }
}
