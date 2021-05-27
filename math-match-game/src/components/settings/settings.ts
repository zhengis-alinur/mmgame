import { BaseComponent } from '../base-component';

function createElem(tag: keyof HTMLElementTagNameMap, className: string) {
  const elem = document.createElement(tag);
  elem.classList.add(className);
  return elem;
}

export class Settings extends BaseComponent {
  public form:HTMLElement = createElem('form', 'settings-form');

  public cardSelect:HTMLElement = createElem('div', 'select-container');

  public difficultySelect:HTMLElement = createElem('div', 'select-container');

  constructor() {
    super('div', ['settings-section']);

    this.cardSelect.innerHTML = `
      <p>Select the type of cards</p>
      <select name="select-card" id="select-card" class="select-card">
        <option value="animals">Animals</option>
        <option value="brands">Brands</option>
      </select>
    `;
    this.difficultySelect.innerHTML = `
      <p>Select difficulty</p>
      <select name="select-difficulty" id="select-difficulty" class="select-difficulty">
        <option value="4">4x4</option>
        <option value="6">6x6</option>
        <option value="8">8x8</option>
      </select>
    `;
    const button = createElem('button', 'button');
    button.innerHTML = 'button';

    this.form.appendChild(this.cardSelect);
    this.form.appendChild(this.difficultySelect);
    // this.form.appendChild(selectContainer.appendChild(this.cardSelect));
    // this.form.appendChild(selectContainer.appendChild(this.difficultySelect));
    this.element.appendChild(this.form);
    this.element.appendChild(button);
  }
}
