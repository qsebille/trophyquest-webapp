import {computed, Injectable, Signal, signal} from '@angular/core';
import {PlayerService} from '../services/player.service';
import {LoadingStatus} from '../models/loading-status.enum';
import {SearchState} from '../models/states/search-state';
import {PlayerSummary} from '../models/dto/player-summary';

@Injectable({
  providedIn: 'root',
})
export class PlayerListStore {
  private readonly INITIAL_STATE: SearchState<PlayerSummary> = {
    results: [],
    total: 0,
    pageNumber: 0,
    pageSize: 20,
    loadingStatus: LoadingStatus.NONE,
  }

  private readonly _state = signal<SearchState<PlayerSummary>>(this.INITIAL_STATE);
  readonly playerSummaries: Signal<PlayerSummary[]> = computed(() => this._state().results);
  readonly isLoading: Signal<boolean> = computed(() => this._state().loadingStatus === LoadingStatus.LOADING);
  readonly hasMorePlayers: Signal<boolean> = computed(() => this._state().loadingStatus === LoadingStatus.PARTIALLY_LOADED);
  readonly isError: Signal<boolean> = computed(() => this._state().loadingStatus === LoadingStatus.ERROR);
  readonly total: Signal<number> = computed(() => this._state().total);

  constructor(private readonly _playerService: PlayerService) {
  }

  reset(): void {
    this._state.set(this.INITIAL_STATE);
  }

  search(): void {
    this._state.update(s => ({...s, loadingStatus: LoadingStatus.LOADING}));
    this._playerService.search(this._state().pageNumber, this._state().pageSize).subscribe({
      next: searchResult => {
        const players = [...this._state().results, ...searchResult.content] as PlayerSummary[];
        const loadingStatus: LoadingStatus = players.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
        this._state.update(s => ({...s, results: players, total: searchResult.total, loadingStatus: loadingStatus}));
      },
      error: error => {
        this._state.update(s => ({...s, loadingStatus: LoadingStatus.ERROR}));
        console.error(error)
      },
    });
  }

  loadMore(): void {
    this._state.update(s => ({...s, pageNumber: s.pageNumber + 1}));
    this.search();
  }

  count(): void {
    this._playerService.count().subscribe({
      next: count => this._state.update(s => ({...s, total: count})),
      error: error => console.error(error)
    });
  }
}
