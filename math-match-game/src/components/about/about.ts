import './about.scss';
import { BaseComponent } from '../base-component';

function createElem(tag: keyof HTMLElementTagNameMap, className: string) {
  const elem = document.createElement(tag);
  elem.classList.add(className);
  return elem;
}

export class About extends BaseComponent {
  constructor() {
    super('div', ['about-section']);
    this.createParts();
  }

  createParts() {
    const steps = createElem('div', 'steps');
    steps.innerHTML = `
    <p>How to play?</p>
    <div class="step">
      <div class="step-explanation">
        <div class="number">1</div>
        <p>Register new player</p>
      </div>
      <div class="step-illustration">
        <img src="./illustrations/image 1.png" alt="">
      </div>
    </div>
    <div class="step">
      <div class="step-explanation">
        <div class="number">1</div>
        <p>Register new player</p>
      </div>
      <div class="step-illustration">
        <img src="./illustrations/image 2.png" alt="">
      </div>
    </div>
    <div class="step">
      <div class="step-explanation">
        <div class="number">1</div>
        <p>Register new player</p>
      </div>
      <div class="step-illustration">
        <img src="./illustrations/image 3.png" alt="">
      </div>
    </div>`;
    this.element.appendChild(steps);
  }
}
