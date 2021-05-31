import { createElem } from '../../shared/createElem';
import { BaseComponent } from '../base-component';
import './score.scss';

export class Score extends BaseComponent {
  public recordHolder = createElem('div', 'record-holder');

  constructor() {
    super('div', ['score-section']);
    const title = createElem('h1', 'score-title');
    title.innerHTML = 'Best scores';
    this.element.append(title);
    this.element.append(this.recordHolder);
  }
}
