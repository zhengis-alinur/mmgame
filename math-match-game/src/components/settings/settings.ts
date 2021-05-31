import './settings.scss';
import { createElem } from '../../shared/createElem';
import { BaseComponent } from '../base-component';

export class Settings extends BaseComponent {
  public form:HTMLElement = createElem('form', 'settings-form');

  public cardSelect:HTMLElement = createElem('div', 'select-container');

  public difficultySelect:HTMLElement = createElem('div', 'select-container');

  constructor() {
    super('div', ['settings-section']);

    this.cardSelect.innerHTML = `
      <div class="number"><span>1</span></div>
      <p>Select the type of cards</p>
      <select name="select-card" id="select-card" class="select-card">
        <option value="animals">Animals</option>
        <option value="it-companies">Brands</option>
      </select>
    `;
    this.difficultySelect.innerHTML = `
      <div class="number"><span>2</span></div>
      <p>Select difficulty</p>
      <select name="select-difficulty" id="select-difficulty" class="select-difficulty">
        <option value="4">4x4</option>
        <option value="6">6x6</option>
        <option value="8">8x8</option>
      </select>
    `;

    this.form.appendChild(this.cardSelect);
    this.form.appendChild(this.difficultySelect);
    // this.form.appendChild(selectContainer.appendChild(this.cardSelect));
    // this.form.appendChild(selectContainer.appendChild(this.difficultySelect));
    this.element.appendChild(this.form);
  }
}
