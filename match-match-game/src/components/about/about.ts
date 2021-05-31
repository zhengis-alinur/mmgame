import './about.scss';
import { BaseComponent } from '../base-component';
import { createElem } from '../../shared/createElem';

export class About extends BaseComponent {
  constructor() {
    super('div', ['about-section']);
    this.createParts();
  }

  createParts() {
    const steps = createElem('div', 'steps');
    steps.innerHTML = `
    <p class="about-title">How to play?</p>
    <div class="step">
      <div class="step-explanation">
        <div class="number"><span>1</span></div>
        <p>Register new player</p>
      </div>
      <div class="step-illustration">
        <img src="./illustrations/image 1.png" alt="">
      </div>
    </div>
    <div class="step">
      <div class="step-explanation">
        <div class="number"><span>2</span></div>
        <p>Configure your game settings</p>
      </div>
      <div class="step-illustration">
        <img src="./illustrations/image 2.png" alt="">
      </div>
    </div>
    <div class="step">
      <div class="step-explanation">
        <div class="number"><span>3</span></div>
        <p>Start you new game! Remember card positions and match it before times up.</p>
      </div>
      <div class="step-illustration">
        <img src="./illustrations/image 3.png" alt="">
      </div>
    </div>`;
    this.element.appendChild(steps);
  }
}
