/* eslint-disable linebreak-style */
import './cards-field.scss';
import { Card } from '../card/card';
import { BaseComponent } from '../base-component';

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['cards-field']);
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
  }
}
