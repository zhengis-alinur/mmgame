import { BaseComponent } from '../base-component';
import './registerPopUp.scss';

function createElem(tag: keyof HTMLElementTagNameMap, className: string) {
  const elem = document.createElement(tag);
  elem.classList.add(className);
  return elem;
}

export class RegisterPopUp extends BaseComponent {
  private form: HTMLElement = createElem('form', 'register-form');

  private nameInput: HTMLElement = createElem('div', 'name-input');

  private surnameInput: HTMLElement = createElem('div', 'surname-input');

  private emailInput: HTMLElement = createElem('div', 'email-input');

  public cancelBtn: HTMLElement = createElem('button', 'cancel-btn');

  public addUserBtn: HTMLElement = createElem('button', 'addUser-btn');

  constructor() {
    super('div', ['register-popup']);
    this.createParts();
  }

  createParts() {
    // title
    const title = createElem('p', 'title');
    title.innerHTML = 'Register new palyer';
    this.element.appendChild(title);
    // user icon
    const userIcon = createElem('img', 'user-icon');
    userIcon.setAttribute('src', './icons/user.svg');
    this.element.appendChild(userIcon);
    // form
    this.nameInput.innerHTML = `
    <label for="name">First Name</label>
    <input id="name" name="name" type="text" required>
    `;
    this.surnameInput.innerHTML = `
    <label for="sername">Last Name</label>
    <input id="surname" name="surname" type="text" required>
    `;
    this.emailInput.innerHTML = `
    <label for="email">E-mail</label>
    <input id="email" name="email" type="email" required>
    `;

    // buttons
    this.addUserBtn.innerHTML = 'add user';
    this.cancelBtn.innerHTML = 'cancel';
    const buttonsContainer = createElem('div', 'buttons-container');
    buttonsContainer.appendChild(this.addUserBtn);
    buttonsContainer.appendChild(this.cancelBtn);

    this.form.appendChild(this.nameInput);
    this.form.appendChild(this.surnameInput);
    this.form.appendChild(this.emailInput);
    this.element.appendChild(this.form);
    this.element.appendChild(buttonsContainer);
  }
}