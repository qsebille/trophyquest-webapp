import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {User} from '../models/dto/user';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {TrophyCount} from '../models/dto/trophy-count';
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileStore {
  private readonly _user: WritableSignal<User | undefined> = signal<User | undefined>(undefined);
  readonly user: Signal<User | undefined> = computed(() => this._user());

  private readonly _trophyCount: WritableSignal<TrophyCount> = signal<TrophyCount>({
    platinum: 0,
    gold: 0,
    silver: 0,
    bronze: 0
  });
  readonly trophyCount: Signal<TrophyCount> = computed(() => this._trophyCount());

  constructor(private _userService: UserService, private _router: Router) {
  }

  public fetch(userProfileId: string | null): void {
    if (null === userProfileId) {
      this._goToErrorPage();
    } else {
      forkJoin({
        user: this._userService.fetchUser(userProfileId),
        trophyCount: this._userService.getTrophyCount(userProfileId)
      }).subscribe({
        next: ({user, trophyCount}) => {
          this._user.set(user);
          this._trophyCount.set(trophyCount)
        },
        error: error => {
          console.error("Unable to fetch user info")
          this._goToErrorPage();
        },
      });
    }
  }

  private _goToErrorPage(): void {
    this._router.navigate(['/error'])
  }

}
