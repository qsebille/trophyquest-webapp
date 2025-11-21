import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {User} from '../models/dto/user';
import {UserService} from '../services/user.service';
import {LoadingStatus} from '../models/loading-status.enum';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private readonly _list: WritableSignal<User[]> = signal<User[]>([]);
  readonly list: Signal<User[]> = computed(() => this._list());

  private readonly _total: WritableSignal<number> = signal<number>(0);
  private readonly _pageNumber: WritableSignal<number> = signal<number>(0);
  private readonly _loadingStatus: WritableSignal<LoadingStatus> = signal<LoadingStatus>(LoadingStatus.NONE);

  constructor(private _userService: UserService) {
  }

  public reset(): void {
    this._list.set([]);
    this._total.set(0);
    this._loadingStatus.set(LoadingStatus.NONE);
    this._pageNumber.set(0);
  }

  public search(): void {
    this._userService.getUsers().subscribe({
      next: users => {
        this._list.set(users.content);
        this._total.set(users.totalElements);
      },
      error: error => console.error(error),
    });
  }

  public loadNextPage(): void {
    this._pageNumber.set(this._pageNumber() + 1);
    this.search();
  }

}
