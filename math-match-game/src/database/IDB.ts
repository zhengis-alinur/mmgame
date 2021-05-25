export class IDB {
  private request: IDBOpenDBRequest = indexedDB.open('match-match-game');

  public db?: IDBDatabase;

  constructor() {
    this.request.onupgradeneeded = (event) => {
      this.db = this.request.result;
      const playersSheet = this.db.createObjectStore('players', { keyPath: 'email' });
    };
    this.request.onsuccess = (e) => {
      const db = this.request.result;
    };
    this.request.onerror = (e) => {
      alert('Error!');
    };
  }

  addUser(name: string, surname: string, email: string) {
    const player = {
      email: `${email}`,
      name: `${name}`,
      surname: `${surname}`,
    };
    const tx = this.request.result.transaction('players', 'readwrite');
    const playersSheet = tx.objectStore('players');
    playersSheet.add(player);
  }
}
