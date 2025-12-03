import {computed, Injectable, Signal, signal} from '@angular/core';
import {User} from '../models/dto/user';
import {UserService} from '../services/user.service';
import {LoadingStatus} from '../models/loading-status.enum';
import {SearchState} from '../models/states/search-state';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private readonly INITIAL_STATE: SearchState<User> = {
    results: [],
    total: 0,
    pageNumber: 0,
    pageSize: 20,
    loadingStatus: LoadingStatus.NONE,
  }

  private readonly _state = signal<SearchState<User>>(this.INITIAL_STATE);
  readonly results: Signal<User[]> = computed(() => this._state().results);

  constructor(private readonly _userService: UserService) {
  }

  reset(): void {
    this._state.set(this.INITIAL_STATE);
  }

  search(): void {
    this._userService.search().subscribe({
      next: searchResult => {
        const users = [...this._state().results, ...searchResult.content] as User[];
        const loadingStatus: LoadingStatus = users.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
        this._state.update(s => ({...s, results: users, total: searchResult.total, loadingStatus: loadingStatus}));
      },
      error: error => console.error(error),
    });
  }

}
