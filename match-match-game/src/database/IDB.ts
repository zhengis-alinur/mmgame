import { Score } from '../components/score/score';
import { createElem } from '../shared/createElem';
import { Player } from './player';

export class IDB {
  private request: IDBOpenDBRequest = indexedDB.open('match-match-game');

  public db?: IDBDatabase;

  // create IndexedDB and two sheets: players, scores. Implement all needed functions of IndexedDB
  constructor() {
    this.request.onupgradeneeded = (event) => {
      this.db = this.request.result;
      const playersSheet = this.db.createObjectStore('players', { keyPath: 'email' });
    };
    this.request.onsuccess = (e) => {
      this.db = this.request.result;
    };
    this.request.onerror = (e) => {
    };
  }

  // this function adds player into players sheet
  addPlayer(player: Player) {
    if (this.db) {
      const transaction = this.db.transaction('players', 'readwrite');
      const objectStore = transaction.objectStore('players');
      objectStore.openCursor().onsuccess = (event: any) => {
        const cursor = event.target.result;
        if (cursor) {
          if (cursor.value.email === player.email) {
            player.score = cursor.value.score;
          } else {
            const playersSheet = transaction.objectStore('players');
            playersSheet.put(player.asObject());
          }
          cursor.continue();
        }
      };
    }
  }

  getPlayers() {
    const players: Record<string, unknown>[] = [];
    if (this.db) {
      const transaction = this.db.transaction('players', 'readonly');
      const objectStore = transaction.objectStore('players');
      objectStore.openCursor().onsuccess = (event: any) => {
        const cursor = event.target.result;
        if (cursor) {
          players.push(cursor.value);
          cursor.continue();
        }
      };
    }
    return players;
  }

  displayFirstN(scorePage: Score, N: number):void {
    const players: Record<string, unknown>[] = [];
    scorePage.recordHolder.innerHTML = '';
    if (this.db) {
      const transaction = this.db.transaction(['players'], 'readonly');
      const objectStore = transaction.objectStore('players');
      objectStore.openCursor().onsuccess = (event: any) => {
        const cursor = event.target.result;
        if (cursor) {
          const recordElem = createElem('div', 'record-elem');
          recordElem.innerHTML = `
            
            <div class="player-info">
              <p class="name">${cursor.value.name} ${cursor.value.surname}</p>
              <p class="email"> ${cursor.value.email}</p>
            </div>
            <div class="player-score">
              <span>Score:</span>
              <span class="score">${cursor.value.score}</span>
            </div>
          `;
          scorePage.recordHolder.append(recordElem);
          players.push(cursor.value);
          cursor.continue();
        }
      };
    }
  }

  renewScore(player: Player, score: number) {
    if (player.score < score) {
      player.score = score;
      const txs = this.request.result.transaction('players', 'readwrite');
      const playersSheet = txs.objectStore('players');
      playersSheet.put(player.asObject());
    }
  }
}
