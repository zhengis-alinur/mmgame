import './card.scss';
import { BaseComponent } from '../base-component';

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  isFlipped = false;

  isActive = true;

  constructor(readonly image: string) {
    super('div', ['card-container']);
    this.element.innerHTML = `<div class="card"><div class="card__front"></div><div class="card__back" style="background-image: url('./images/${image}')"></div></div>`;
  }

  // checks if the given card and this card are have the same image. If it is returns a promise with flag(isPair).
  check(card: Card) {
    const promise = new Promise((resolve, reject) => {
      window.setTimeout(() => {
        let isPair = false;
        if (this.image !== card.image) {
          this.unFlip();
          card.unFlip();
        } else {
          card.isActive = false;
          this.isActive = false;
          isPair = true;
        }
        resolve(isPair);
      }, 1000);
    });
    return promise;
  }

  // flip this card
  flip() {
    this.element.classList.add(FLIP_CLASS);
    this.isFlipped = true;
  }

  // unflip this card
  unFlip() {
    this.element.classList.remove(FLIP_CLASS);
    this.isFlipped = false;
  }
}
