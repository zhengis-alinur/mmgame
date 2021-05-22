import { BaseComponent } from '../base-component';

export class Settings extends BaseComponent {
  constructor() {
    super('div', ['settings-section']);
    const text = document.createTextNode('just settings');
    this.element.appendChild(text);
  }
}
