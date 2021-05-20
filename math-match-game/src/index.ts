import './styles.scss';

//create header
const header = document.createElement('header');
const container = document.createElement('div');
container.className = 'container';

const logo = document.createElement('img');
logo.className = 'logo';

const nav = document.createElement('div');
nav.className = 'nav';
let navNames: string[] = ['About', 'Best score', 'Game settings'];
for(let i = 0; i < 3; i++) {
  nav.appendChild(document.createTextNode(navNames[i]));
}

const signUpBtn = document.createElement('button');
signUpBtn.className = 'sign-up-btn';

const userAva = document.createElement('img');
userAva.className = 'user-ava';

const startButton = document.createElement('button');
startButton.className = 'start-btn'

header.appendChild(container);

container.appendChild(logo);
container.appendChild(nav);
container.appendChild(signUpBtn);
container.appendChild(userAva);
container.appendChild(startButton);

//create main
const main = document.createElement('main');
//create cards-field with card-container and card(back and front sides)
const cardsField = document.createElement('div');
cardsField.className = 'cards-field';

for(let i = 0; i < 16; i++) {
  const cardContainer = document.createElement('div');
  cardContainer.className = 'card-container';

  const card = document.createElement('div');
  card.className = 'card';

  const cardFront = document.createElement('div');
  cardFront.className = 'card__front';
  cardFront.appendChild(document.createTextNode('front'));

  const cardBack = document.createElement('div');
  cardBack.className = 'card__back';
  cardBack.appendChild(document.createTextNode('back'));

  card.appendChild(cardFront);
  card.appendChild(cardBack);
  cardContainer.appendChild(card);

  cardsField.appendChild(cardContainer);
}

main.appendChild(cardsField);

//append main and header into body
document.body.appendChild(header);
document.body.appendChild(main);
console.log('Hello world');
