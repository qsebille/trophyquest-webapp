import {computed, Injectable, Signal, signal} from '@angular/core';
import {Player} from '../models/dto/player';
import {PlayerService} from '../services/player.service';
import {LoadingStatus} from '../models/loading-status.enum';
import {SearchState} from '../models/states/search-state';

@Injectable({
  providedIn: 'root',
})
export class PlayerListStore {
  private readonly INITIAL_STATE: SearchState<Player> = {
    results: [],
    total: 0,
    pageNumber: 0,
    pageSize: 20,
    loadingStatus: LoadingStatus.NONE,
  }

  private readonly _state = signal<SearchState<Player>>(this.INITIAL_STATE);
  readonly results: Signal<Player[]> = computed(() => this._state().results);

  constructor(private readonly _playerService: PlayerService) {
  }

  reset(): void {
    this._state.set(this.INITIAL_STATE);
  }

  search(): void {
    this._playerService.search().subscribe({
      next: searchResult => {
        const players = [...this._state().results, ...searchResult.content] as Player[];
        const loadingStatus: LoadingStatus = players.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
        this._state.update(s => ({...s, results: players, total: searchResult.total, loadingStatus: loadingStatus}));
      },
      error: error => console.error(error),
    });
  }

}
