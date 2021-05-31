import { createElem } from '../../shared/createElem';
import { BaseComponent } from '../base-component';
import './registerPopUp.scss';

export class RegisterPopUp extends BaseComponent {
  private form: HTMLElement = createElem('form', 'register-form');

  public nameInput: HTMLElement = createElem('div', 'name-input');

  public surnameInput: HTMLElement = createElem('div', 'surname-input');

  public emailInput: HTMLElement = createElem('div', 'email-input');

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
    <input id="name-input" name="name" type="text" pattern="^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$" required>
    `;
    this.surnameInput.innerHTML = `
    <label for="sername">Last Name</label>
    <input id="surname-input" name="surname" type="text" pattern="^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$" required>
    `;
    const emailRegex = `^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$`;
    this.emailInput.innerHTML = `
    <label for="email">E-mail</label>
    <input id="email-input" name="email" type="email" pattern="${emailRegex}" required>
    `;

    // buttons
    this.addUserBtn.innerHTML = 'add user';
    this.addUserBtn.setAttribute('type', 'submit');
    this.cancelBtn.innerHTML = 'cancel';
    const buttonsContainer = createElem('div', 'buttons-container');
    buttonsContainer.appendChild(this.addUserBtn);
    buttonsContainer.appendChild(this.cancelBtn);

    this.form.appendChild(this.nameInput);
    this.form.appendChild(this.surnameInput);
    this.form.appendChild(this.emailInput);
    this.form.appendChild(buttonsContainer);
    this.element.appendChild(this.form);
  }
}
