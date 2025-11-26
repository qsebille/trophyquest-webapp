import {computed, Injectable, signal} from '@angular/core';
import {UserService} from '../services/user.service';
import {forkJoin} from 'rxjs';
import {ProfileState} from '../models/states/profile-state';
import {ProfilePagination} from '../models/dto/profile-pagination';
import {ErrorService} from '../services/error.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileStore {
  private readonly _state = signal<ProfileState>({
    user: undefined,
    trophyCount: {platinum: 0, gold: 0, silver: 0, bronze: 0},
    gameList: [],
    trophyList: [],
  });
  readonly user = computed(() => this._state().user);
  readonly gameList = computed(() => this._state().gameList);
  readonly trophyList = computed(() => this._state().trophyList);
  readonly trophyCount = computed(() => this._state().trophyCount);

  private readonly _pagination = signal<ProfilePagination>({
    gamePage: 0,
    gameTotalCount: 0,
    trophyPage: 0,
    trophyTotalCount: 0,
  })

  constructor(private readonly _userService: UserService, private readonly _errorService: ErrorService) {
  }

  fetch(userProfileId: string | null): void {
    if (null == userProfileId) {
      this._errorService.logErrorAndRedirect('Invalid user id');
      return;
    }

    this._pagination.set({
      gamePage: 0,
      gameTotalCount: 0,
      trophyPage: 0,
      trophyTotalCount: 0,
    });

    forkJoin({
      user: this._userService.fetchUser(userProfileId),
      trophyCount: this._userService.getTrophyCount(userProfileId),
      gameSearch: this._userService.searchGames(userProfileId, this._pagination().gamePage, 50),
      trophySearch: this._userService.searchEarnedTrophies(userProfileId, this._pagination().trophyPage, 50),
    }).subscribe({
      next: ({user, trophyCount, gameSearch, trophySearch}) => {
        this._state.set({
          user,
          trophyCount,
          gameList: gameSearch.content,
          trophyList: trophySearch.content,
        });
        this._pagination.update((p) => ({
          ...p,
          gameTotalCount: gameSearch.totalElements,
          trophyTotalCount: trophySearch.totalElements
        }));
      },
      error: () => this._errorService.logErrorAndRedirect('Failed loading profile: ' + userProfileId),
    });
  }

}
