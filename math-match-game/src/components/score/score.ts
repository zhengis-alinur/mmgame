import { BaseComponent } from '../base-component';

export class Score extends BaseComponent {
  constructor() {
    super('div', ['score-section']);
    const text = document.createTextNode('just score');
    this.element.appendChild(text);
  }
}
