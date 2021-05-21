/* eslint-disable linebreak-style */
import './card.scss';
import { BaseComponent } from '../base-component';
import { delay } from '../shared/delay';
import { Game } from '../game/game';

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  isFlipped = false;

  isActive = true;

  constructor(readonly image: string) {
    super('div', ['card-container']);
    this.element.innerHTML = `<div class="card"><div class="card__front">front</div><div class="card__back" style="background-image: url('./images/${image}')">back</div></div>`;
  }

  check(card: Card) {
    setTimeout(() => {
      if (this.image !== card.image) {
        this.unFlip();
        card.unFlip();
      } else {
        card.isActive = false;
        this.isActive = false;
      }
    }, 1000);
  }

  flip() {
    this.element.classList.add(FLIP_CLASS);
    this.isFlipped = true;
  }

  unFlip() {
    this.element.classList.remove(FLIP_CLASS);
    this.isFlipped = false;
  }
}
