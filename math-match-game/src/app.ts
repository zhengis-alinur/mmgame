/* eslint-disable linebreak-style */
import { Game } from './components/game/game';
import { ImageCategory } from './models/image-category-model';

export class App {
  public readonly game: Game;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.rootElement.innerHTML = '';
    this.rootElement.appendChild(this.game.element);
  }

  async start(cardType: string, difficulty: string) {
    const res = await fetch('./images.json');
    const categories: ImageCategory[] = await res.json();
    const difficultyInt = parseInt(difficulty, 10);
    // I put here just one category, because I have not load all images for the other category
    const { 0: cat } = categories;
    let images = cat.images.map((name: string) => `${cat.category}/${name}`);
    images = images.slice(0, (difficultyInt * difficultyInt) / 2);
    this.game.newGame(images, difficultyInt);
  }
}
