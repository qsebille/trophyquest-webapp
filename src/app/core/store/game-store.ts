import {computed, Injectable, signal} from '@angular/core';
import {Game} from '../models/dto/game';
import {GameService} from '../services/game.service';
import {ErrorService} from '../services/error.service';

@Injectable({
  providedIn: 'root',
})
export class GameStore {
  private readonly _game = signal<Game>({
    id: "",
    title: "",
    platforms: [],
    imageUrl: ""
  });

  readonly game = computed(() => this._game());

  constructor(private readonly _gameService: GameService, private readonly _errorService: ErrorService) {
  }

  fetch(gameId: string | null) {
    if (null == gameId) {
      this._errorService.logErrorAndRedirect('Invalid game id');
      return;
    }

    console.info('Fetching game: ' + gameId);
    this._gameService.fetchGame(gameId).subscribe({
      next: game => this._game.set(game),
      error: () => this._errorService.logErrorAndRedirect('Failed loading game: ' + gameId),
    })
  }

}
