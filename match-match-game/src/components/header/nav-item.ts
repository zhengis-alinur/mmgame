import { BaseComponent } from '../base-component';

export class NavItem extends BaseComponent {
  public isActive = true;

  constructor(readonly label: string, readonly image: string) {
    super('div', ['nav-item']);
    this.element.innerHTML = `<div class="icon" style="background-image: url('./icons/${image}');"></div><span class="label">${label}</span>`;
  }
}
