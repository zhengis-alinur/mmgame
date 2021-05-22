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

  private right?: HTMLElement;

  constructor() {
    super('header', ['header']);
    this.createLeft();
    this.createRight();
  }

  createLeft() {
    this.left = createElem('div', 'logo');
    this.element.appendChild(this.left);
  }

  createCenter() {
    this.center = createElem('div', 'nav-menu');
    this.element.appendChild(this.center);

    this.aboutBtn.element.classList.add('about');
    this.aboutBtn.isActive = false;

    this.scoreBtn.element.classList.add('score');

    this.settingsBtn.element.classList.add('settings');

    // add EventListeners for navigation buttons
    this.aboutBtn.element.addEventListener('click', );
    this.aboutBtn.element.addEventListener('click', );
    this.aboutBtn.element.addEventListener('click', );

    this.center.appendChild(this.aboutBtn.element);
    this.center.appendChild(this.scoreBtn.element);
    this.center.appendChild(this.settingsBtn.element);
  }

  createRight() {
    this.right = createElem('div', 'rigth');
    this.element.appendChild(this.right);
  }

}
