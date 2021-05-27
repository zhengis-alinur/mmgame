export class IDB {
  private request: IDBOpenDBRequest = indexedDB.open('match-match-game');

  public db?: IDBDatabase;

  // create IndexedDB and two sheets: players, scores. Implement all needed functions of IndexedDB
  constructor() {
    this.request.onupgradeneeded = (event) => {
      this.db = this.request.result;
      const playersSheet = this.db.createObjectStore('players', { keyPath: 'email' });
      const scoreSheet = this.db.createObjectStore('scores', { keyPath: 'email' });
    };
    this.request.onsuccess = (e) => {
      const db = this.request.result;
    };
    this.request.onerror = (e) => {
    };
  }

  // this function adds player into players sheet
  addPlayer(name: string, surname: string, email: string) {
    const player = {
      email: `${email}`,
      name: `${name}`,
      surname: `${surname}`,
    };
    const tx = this.request.result.transaction('players', 'readwrite');
    const playersSheet = tx.objectStore('players');
    playersSheet.add(player);
  }

  // this function adds record into scores sheet
  addRecord(email: string, time: number) {
    const record = {
      email: `${email}`,
      time: `${time}`,
    };
    const tx = this.request.result.transaction('scores', 'readwrite');
    const scoresSheet = tx.objectStore('scores');
    scoresSheet.add(record);
  }
}
