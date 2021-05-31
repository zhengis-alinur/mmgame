export class Player {
  readonly name?: string;

  readonly surname?: string;

  readonly email?: string;

  public score = 0;

  constructor(name: string, surname: string, email: string) {
    this.name = name;
    this.surname = surname;
    this.email = email;
  }

  asObject() {
    return {
      name: this.name,
      surname: this.surname,
      email: this.email,
      score: this.score,
    };
  }
}
