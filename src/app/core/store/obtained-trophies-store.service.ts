import {computed, Injectable, Signal, signal} from '@angular/core';
import {ObtainedTrophy} from '../models/dto/obtained-trophy';
import {SearchState} from '../models/states/search-state';
import {LoadingStatus} from '../models/loading-status.enum';
import {TrophyService} from '../services/trophy.service';

@Injectable({
  providedIn: 'root',
})
export class ObtainedTrophiesStore {
  private readonly INITIAL_STATE: SearchState<ObtainedTrophy> = {
    results: [],
    total: 0,
    pageNumber: 0,
    pageSize: 20,
    loadingStatus: LoadingStatus.NONE
  }

  private readonly _state = signal<SearchState<ObtainedTrophy>>(this.INITIAL_STATE);
  readonly results: Signal<ObtainedTrophy[]> = computed(() => this._state().results);
  readonly isLoading: Signal<boolean> = computed(() => this._state().loadingStatus === LoadingStatus.LOADING);
  readonly hasMoreTrophies: Signal<boolean> = computed(() => this._state().loadingStatus === LoadingStatus.PARTIALLY_LOADED);
  readonly total: Signal<number> = computed(() => this._state().total);

  constructor(private readonly _trophyService: TrophyService) {
  }

  resetState(): void {
    this._state.set(this.INITIAL_STATE);
  }

  search(): void {
    this._state.update(s => ({...s, loadingStatus: LoadingStatus.LOADING}));
    this._trophyService.searchLastObtained(this._state().pageNumber, this._state().pageSize).subscribe({
      next: searchResult => {
        const trophies = [...this._state().results, ...searchResult.content] as ObtainedTrophy[];
        const loadingStatus: LoadingStatus = trophies.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
        this._state.update(s => ({...s, results: trophies, total: searchResult.total, loadingStatus: loadingStatus}));
      },
      error: error => {
        console.error(error);
        this._state.update(s => ({...s, loadingStatus: LoadingStatus.ERROR}));
      },
    });
  }

  loadMore(): void {
    this._state.update(s => ({...s, pageNumber: s.pageNumber + 1}));
    this.search();
  }

}
