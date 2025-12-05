import {computed, Injectable, Signal, signal} from '@angular/core';
import {Game} from '../models/dto/game';
import {GameService} from '../services/game.service';
import {ErrorService} from '../services/error.service';
import {PlayerService} from '../services/player.service';
import {forkJoin} from 'rxjs';
import {GameGroupTrophies} from '../models/dto/game-group-trophies';
import {Trophy} from '../models/dto/trophy';

@Injectable({
  providedIn: 'root',
})
export class GameStore {
  private readonly _game = signal<Game>({
    id: "",
    title: "",
    imageUrl: ""
  });
  readonly game = computed(() => this._game());

  private readonly _baseGameTrophies = signal<GameGroupTrophies | undefined>(undefined);
  private readonly _dlcTrophies = signal<GameGroupTrophies[]>([]);
  private _filters = signal<{ earned?: 'all' | 'earned' | 'unearned' }>({
    earned: 'all',
  });
  readonly baseGameTrophies: Signal<Trophy[]> = computed(() => {
    switch (this._filters().earned) {
      case 'all':
        return this._baseGameTrophies()?.trophies ?? [];
      case 'earned':
        return this._filterTrophies(this._baseGameTrophies()?.trophies ?? [], 'earned');
      case 'unearned':
        return this._filterTrophies(this._baseGameTrophies()?.trophies ?? [], 'unearned');
      default:
        return this._baseGameTrophies()?.trophies ?? [];
    }
  });
  readonly dlcTrophies: Signal<GameGroupTrophies[]> = computed(() => {
    switch (this._filters().earned) {
      case 'all':
        return this._dlcTrophies();
      case 'earned':
        return this._dlcTrophies().map(dlc => ({...dlc, trophies: this._filterTrophies(dlc.trophies, 'earned')}));
      case 'unearned':
        return this._dlcTrophies().map(dlc => ({...dlc, trophies: this._filterTrophies(dlc.trophies, 'unearned')}));
      default:
        return [];
    }
  });
  readonly earnedFilter = computed(() => this._filters().earned ?? 'all');

  constructor(
    private readonly _gameService: GameService,
    private readonly _playerService: PlayerService,
    private readonly _errorService: ErrorService,
  ) {
  }

  changeEarnedFilter(filter: 'all' | 'earned' | 'unearned') {
    this._filters.update(f => ({...f, earned: filter}));
  }

  fetchPlayerGame(
    playerId: string | null,
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
    if (null == playerId) {
      this._errorService.logErrorAndRedirect('Invalid player id');
      return;
    }

    console.info('Fetching game: ' + gameId + ' and trophies from collection ' + collectionId + ' for player ' + playerId + '...');
    forkJoin({
      game: this._gameService.fetchGame(gameId),
      trophies: this._playerService.fetchCollectionTrophies(playerId, collectionId),
    }).subscribe({
      next: ({game, trophies}) => {
        this._game.set(game);
        this._baseGameTrophies.set(trophies.filter(t => t.groupName === 'default')[0] as GameGroupTrophies);
        this._dlcTrophies.set(trophies.filter(t => t.groupName !== 'default'));
      },
      error: () => this._errorService.logErrorAndRedirect('Failed loading game: ' + gameId + ' or collection: ' + collectionId),
    });
  }

  private _filterTrophies(
    trophies: Trophy[],
    filter: 'all' | 'earned' | 'unearned'
  ): Trophy[] {
    switch (filter) {
      case 'all':
        return trophies;
      case 'earned':
        return trophies.filter(t => t.earnedDate !== null);
      case 'unearned':
        return trophies.filter(t => t.earnedDate === null);
    }
  }

}
