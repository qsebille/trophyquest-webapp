import {computed, Injectable, Signal, signal} from '@angular/core';
import {GameService} from '../services/game.service';
import {Game} from '../models/dto/game';
import {SearchState} from '../models/states/search-state';
import {LoadingStatus} from '../models/loading-status.enum';

@Injectable({
  providedIn: 'root',
})
export class GameListStore {
  private readonly _initialState: SearchState<Game> = {
    results: [],
    total: 0,
    pageNumber: 0,
    pageSize: 20,
    loadingStatus: LoadingStatus.NONE,
  }

  private _state = signal<SearchState<Game>>(this._initialState);
  readonly results: Signal<Game[]> = computed(() => this._state().results);
  readonly isLoading: Signal<boolean> = computed(() => this._state().loadingStatus === LoadingStatus.LOADING);
  readonly hasMoreGames: Signal<boolean> = computed(() => this._state().loadingStatus === LoadingStatus.PARTIALLY_LOADED);
  readonly total: Signal<number> = computed(() => this._state().total);

  constructor(private readonly _gameService: GameService) {
  }

  resetState(): void {
    this._state.set(this._initialState);
  }

  search() {
    console.info('Searching games...');
    this._state.update(s => ({...s, loadingStatus: LoadingStatus.LOADING}));
    this._gameService.searchGames(this._state().pageNumber, this._state().pageSize).subscribe({
      next: result => {
        const games = [...this._state().results, ...result.content] as Game[];
        const loadingStatus: LoadingStatus = games.length < result.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
        this._state.update(s => ({...s, results: games, total: result.total, loadingStatus: loadingStatus}));
      },
      error: error => {
        console.error(error);
        this._state.update(s => ({...s, loadingStatus: LoadingStatus.ERROR}));
      },
    });
  }

  loadMore() {
    this._state.update(s => ({...s, pageNumber: s.pageNumber + 1}));
    this.search();
  }
}
