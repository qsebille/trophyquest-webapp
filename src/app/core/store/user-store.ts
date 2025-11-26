import {computed, Injectable, Signal, signal} from '@angular/core';
import {User} from '../models/dto/user';
import {UserService} from '../services/user.service';
import {LoadingStatus} from '../models/loading-status.enum';
import {SearchState} from '../models/states/search-state';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private readonly _searchState = signal<SearchState>({
    total: 0,
    pageNumber: 0,
    loadingStatus: LoadingStatus.NONE,
  });

  private readonly _list = signal<User[]>([]);
  readonly list: Signal<User[]> = computed(() => this._list());

  constructor(private readonly _userService: UserService) {
  }

  reset(): void {
    this._searchState.set({total: 0, pageNumber: 0, loadingStatus: LoadingStatus.NONE});
    this._list.set([]);
  }

  search(): void {
    this._userService.search().subscribe({
      next: users => {
        this._list.set(users.content);
        this._searchState.update(state => ({...state, total: users.totalElements,}));
      },
      error: error => console.error(error),
    });
  }

}
