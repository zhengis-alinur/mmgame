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

    const stepsText = ['Register new player', 'Configure your game settings', 'Start you new game! Remember card positions and match it before times up.'];

    stepsText.forEach((val, index) => {
      const step = createElem('div', 'step');
      const stepExplanation = createElem('div', 'step-explanation');
      stepExplanation.innerHTML = `
        <div class="number"><span>${index + 1}</span></div>
        <p>${val}</p>
      `;
      const stepIllustration = createElem('div', 'step-illustration');
      const img = createElem('img', 'img');
      img.setAttribute('src', `./illustrations/image${index + 1}.png`);
      stepIllustration.append(img);
      step.append(stepExplanation);
      step.append(stepIllustration);
      steps.append(step);
    });
    this.element.appendChild(steps);
  }
}
