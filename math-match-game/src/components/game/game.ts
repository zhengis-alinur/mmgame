import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { delay } from '../shared/delay';

const FLIP_DELAY = 1000;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  public cards: Card[] = [];

  constructor() {
    super();
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
  }

  newGame(images: string[]) {
    this.cardsField.clear();
    this.cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);
    this.cardsField.addCards(this.cards);

    this.cards.forEach((card) => card.element.addEventListener('click', () => this.cardHandler(card)));
  }

  stopGame() {
    this.cardsField.clear();
  }

  private async cardHandler(card: Card) {
    if (!card.isActive) return;
    if (this.isAnimation) return;
    card.flip();
    if (this.activeCard === undefined) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    this.cards.forEach((c) => {
      c.isActive = false;
    });
    card.check(this.activeCard);
    setTimeout(() => {
      this.cards.forEach((c) => {
        c.isActive = true;
      });
    }, 1100);
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}