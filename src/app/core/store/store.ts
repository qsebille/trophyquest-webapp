import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {GameService} from '../services/game.service';
import {Game} from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class Store {

  private readonly _games: WritableSignal<Game[]> = signal<Game[]>([]);
  private readonly _gamesLoading: WritableSignal<boolean> = signal(false);
  private readonly _gamesLoadingError: WritableSignal<boolean> = signal<boolean>(false);

  readonly games: Signal<Game[]> = computed(() => this._games());
  readonly gamesLoading: Signal<boolean> = computed(() => this._gamesLoading());
  readonly gamesLoadingError: Signal<boolean> = computed(() => this._gamesLoadingError());
  readonly hasGames: Signal<boolean> = computed(() => this._games().length > 0 && !this._gamesLoadingError());

  constructor(private gameService: GameService) {
  }

  loadGames(): void {
    this._gamesLoading.set(true);
    this._gamesLoadingError.set(false);

    this.gameService.getGameList().subscribe({
      next: games => {
        this._games.set(games);
        this._gamesLoading.set(false);
      },
      error: err => {
        console.error(err);
        this._gamesLoadingError.set(true);
        this._gamesLoading.set(false);
      },
    });
  }


}
