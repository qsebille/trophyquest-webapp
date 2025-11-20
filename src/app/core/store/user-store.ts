import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {User} from '../models/dto/user';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private readonly _selected: WritableSignal<User | undefined> = signal<User | undefined>(undefined);
  readonly selected: Signal<User | undefined> = computed(() => this._selected());

  private readonly _list: WritableSignal<User[]> = signal<User[]>([]);
  readonly list: Signal<User[]> = computed(() => this._list());


  constructor(private _userService: UserService) {
  }

  public refreshUsers(): void {
    this._userService.getUsers().subscribe({
      next: users => this._list.set(users),
      error: error => console.error(error),
    });
  }

  public selectUser(userId: string): void {
    this._userService.fetchUser(userId).subscribe({
      next: user => this._selected.set(user),
      error: error => console.error(error),
    });
  }

}
