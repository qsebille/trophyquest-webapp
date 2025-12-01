import {computed, Injectable, signal} from '@angular/core';
import {Game} from '../models/dto/game';
import {GameService} from '../services/game.service';
import {ErrorService} from '../services/error.service';
import {UserService} from '../services/user.service';
import {forkJoin} from 'rxjs';
import {GameGroupTrophies} from '../models/dto/game-group-trophies';

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
  private readonly _baseGameTrophies = signal<GameGroupTrophies | undefined>(undefined);
  readonly baseGameTrophies = computed(() => this._baseGameTrophies())
  private readonly _dlcTrophies = signal<GameGroupTrophies[]>([]);
  readonly dlcTrophies = computed(() => this._dlcTrophies());

  constructor(
    private readonly _gameService: GameService,
    private readonly _userService: UserService,
    private readonly _errorService: ErrorService,
  ) {
  }

  fetchUserGame(
    userId: string | null,
    gameId: string | null,
    collectionId: string | null,
  ) {
    if (null == gameId) {
      this._errorService.logErrorAndRedirect('Invalid game id');
      return;
    }
    if (null == collectionId) {
      this._errorService.logErrorAndRedirect('Invalid collection id');
      return;
    }
    if (null == userId) {
      this._errorService.logErrorAndRedirect('Invalid user id');
      return;
    }

    console.info('Fetching game: ' + gameId + ' and trophies from collection ' + collectionId + ' for user ' + userId + '...');
    forkJoin({
      game: this._gameService.fetchGame(gameId),
      trophies: this._userService.fetchCollectionTrophies(userId, collectionId),
    }).subscribe({
      next: ({game, trophies}) => {
        this._game.set(game);
        this._baseGameTrophies.set(trophies.filter(t => t.groupName === 'default')[0] as GameGroupTrophies);
        this._dlcTrophies.set(trophies.filter(t => t.groupName !== 'default'));
      },
      error: () => this._errorService.logErrorAndRedirect('Failed loading game: ' + gameId + ' or collection: ' + collectionId),
    });
  }

}
