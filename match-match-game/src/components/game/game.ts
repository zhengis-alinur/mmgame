import { BaseComponent } from '../base-component';
import { CardsField } from '../cards-field/cards-field';
import { Card } from '../card/card';

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  public cards: Card[] = [];

  private pairCounter = 0;

  private matches = 0;

  private unluckymatches = 0;

  constructor() {
    super('div', ['game']);
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
  }

  // this function creates a gamefield according to the parameters.
  newGame(images: string[], difficulty: number) {
    this.cardsField.clear();
    const cellDimension = 100 / difficulty;
    switch (difficulty) {
      case 6: {
        this.cardsField.element.style.gridTemplateColumns = `${cellDimension}% ${cellDimension}% ${cellDimension}% ${cellDimension}% ${cellDimension}% ${cellDimension}%`;
        this.cardsField.element.style.gridTemplateRows = `${cellDimension}% ${cellDimension}% ${cellDimension}% ${cellDimension}% ${cellDimension}% ${cellDimension}%`;
        break;
      }
      case 8: {
        this.cardsField.element.style.gridTemplateColumns = `${cellDimension}% ${cellDimension}% ${cellDimension}% ${cellDimension}% ${cellDimension}% ${cellDimension}% ${cellDimension}% ${cellDimension}%`;
        this.cardsField.element.style.gridTemplateRows = `${cellDimension}% ${cellDimension}% ${cellDimension}% ${cellDimension}% ${cellDimension}% ${cellDimension}% ${cellDimension}% ${cellDimension}%`;
        break;
      }
      default: break;
    }
    // concat - duplicates cards
    // map - create card according to image
    // sort - shuffle cards
    // them add listeners of click to all cards in cards-field
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

  getMatchesScore() {
    return (this.matches - this.unluckymatches) * 100;
  }

  // Check if Card is Active(card can be clicked only if it is active). Card may be inActive,
  // if is time of checking two choosen cards
  // isAnimation is made for making this function atomic
  // ActiveCard - is a card which is choosen first
  // so if there is no active card after choosing one, we make that card active
  // if this.activeCards is not equal to the secondly choosen card, we just unflip() them, and make them active.
  private async cardHandler(card: Card) {
    if (!card.isActive) return;
    if (this.isAnimation) return;
    card.flip();
    if (this.activeCard === undefined) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    this.matches++;
    this.cards.forEach((c) => {
      c.isActive = false;
    });

    // check() returns Promise
    card.check(this.activeCard).then((value) => {
      if (value) {
        this.pairCounter++;
      } else {
        this.unluckymatches++;
      }
    });

    // check if player found all pairs. If it is, dispatch event that says that it is finish of game
    if (this.pairCounter === this.cards.length / 2 - 1) {
      const gameFinishEvent = new CustomEvent('game-finish', {
        bubbles: true,
      });
      this.element.dispatchEvent(gameFinishEvent);
    }
    // activate all cards after checking pair
    setTimeout(() => {
      this.cards.forEach((c) => {
        c.isActive = true;
      });
    }, 1010);
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
