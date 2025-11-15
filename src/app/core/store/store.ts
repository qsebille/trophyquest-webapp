import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {GameService} from '../services/game.service';
import {Game} from '../models/game';
import {LoadingStatus} from '../models/loading-status.enum';

@Injectable({
  providedIn: 'root',
})
export class Store {

  private readonly _games: WritableSignal<Game[]> = signal<Game[]>([]);
  private readonly _gamesLoadingStatus: WritableSignal<LoadingStatus> = signal(LoadingStatus.NONE);

  readonly games: Signal<Game[]> = computed(() => this._games());
  readonly gamesLoadingStatus: Signal<LoadingStatus> = computed(() => this._gamesLoadingStatus());
  readonly hasGames: Signal<boolean> = computed(() => this._games().length > 0 && this._gamesLoadingStatus() === LoadingStatus.SUCCESS);

  constructor(private gameService: GameService) {
  }

  loadGames(): void {
    this._gamesLoadingStatus.set(LoadingStatus.LOADING);

    this.gameService.getGameList().subscribe({
      next: games => {
        this._games.set(games);
        this._gamesLoadingStatus.set(LoadingStatus.SUCCESS);
      },
      error: err => {
        console.error(err);
        this._gamesLoadingStatus.set(LoadingStatus.ERROR);
      },
    });
  }


}
