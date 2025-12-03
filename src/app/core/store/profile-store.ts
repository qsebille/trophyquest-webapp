import {computed, Injectable, signal} from '@angular/core';
import {UserService} from '../services/user.service';
import {forkJoin} from 'rxjs';
import {ProfileState} from '../models/states/profile-state';
import {ErrorService} from '../services/error.service';
import {SearchState} from '../models/states/search-state';
import {LoadingStatus} from '../models/loading-status.enum';
import {UserGame} from '../models/dto/user-game';
import {Trophy} from '../models/dto/trophy';

@Injectable({
  providedIn: 'root',
})
export class ProfileStore {
  private readonly INITIAL_GAME_STATE: SearchState<UserGame> = {
    results: [],
    total: 0,
    pageNumber: 0,
    pageSize: 20,
    loadingStatus: LoadingStatus.NONE,
  }
  private readonly INITIAL_TROPHY_STATE: SearchState<Trophy> = {
    results: [],
    total: 0,
    pageNumber: 0,
    pageSize: 20,
    loadingStatus: LoadingStatus.NONE,
  }
  private readonly INITIAL_STATE: ProfileState = {
    userProfileId: "",
    user: undefined,
    games: this.INITIAL_GAME_STATE,
    trophies: this.INITIAL_TROPHY_STATE,
    trophyCount: {platinum: 0, gold: 0, silver: 0, bronze: 0},
  }

  private readonly _state = signal<ProfileState>(this.INITIAL_STATE);
  readonly user = computed(() => this._state().user);
  readonly gameResults = computed(() => this._state().games.results);
  readonly hasMoreGames = computed(() => this._state().games.loadingStatus === LoadingStatus.PARTIALLY_LOADED);
  readonly isLoadingGames = computed(() => this._state().games.loadingStatus === LoadingStatus.LOADING);
  readonly trophyResults = computed(() => this._state().trophies.results);
  readonly trophyCount = computed(() => this._state().trophyCount);
  readonly hasMoreTrophies = computed(() => this._state().trophies.loadingStatus === LoadingStatus.PARTIALLY_LOADED);
  readonly isLoadingTrophies = computed(() => this._state().trophies.loadingStatus === LoadingStatus.LOADING);

  constructor(
    private readonly _userService: UserService,
    private readonly _errorService: ErrorService
  ) {
  }

  reset(): void {
    this._state.set(this.INITIAL_STATE);
  }

  fetch(userProfileId: string | null): void {
    if (null == userProfileId) {
      this._errorService.logErrorAndRedirect('Invalid user id');
      return;
    }

    forkJoin({
      user: this._userService.fetchUser(userProfileId),
      trophyCount: this._userService.getTrophyCount(userProfileId),
    }).subscribe({
      next: ({user, trophyCount}) => this._state.update(s => ({...s, userProfileId, user, trophyCount})),
      error: () => this._errorService.logErrorAndRedirect('Failed loading profile: ' + userProfileId),
    });
  }

  searchGames(userProfileId: string | null): void {
    if (null == userProfileId) {
      this._errorService.logErrorAndRedirect('Invalid user id');
      return;
    }

    this._state.update(s => ({...s, games: {...s.games, loadingStatus: LoadingStatus.LOADING}}));
    this._userService.searchGames(userProfileId, this._state().games.pageNumber, this._state().games.pageSize).subscribe({
      next: searchResult => {
        const games = [...this._state().games.results, ...searchResult.content] as UserGame[];
        const loadingStatus: LoadingStatus = games.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
        this._state.update(s => ({
          ...s,
          games: {...s.games, results: games, total: searchResult.total, loadingStatus: loadingStatus}
        }));
      },
      error: () => {
        this._errorService.logErrorAndRedirect('Failed loading games for profile: ' + userProfileId)
        this._state.update(s => ({...s, games: {...s.games, loadingStatus: LoadingStatus.ERROR}}));
      },
    });
  }

  loadMoreGames(userProfileId: string | null): void {
    if (null == userProfileId) {
      this._errorService.logErrorAndRedirect('Invalid user id');
      return;
    }

    this._state.update(s => ({...s, games: {...s.games, pageNumber: s.games.pageNumber + 1}}));
    this.searchGames(userProfileId);
  }

  searchTrophies(userProfileId: string | null): void {
    if (null == userProfileId) {
      this._errorService.logErrorAndRedirect('Invalid user id');
      return;
    }

    this._state.update(s => ({...s, trophies: {...s.trophies, loadingStatus: LoadingStatus.LOADING}}));
    this._userService.searchEarnedTrophies(userProfileId, this._state().trophies.pageNumber, this._state().trophies.pageSize).subscribe({
      next: searchResult => {
        const results = [...this._state().trophies.results, ...searchResult.content] as Trophy[];
        const loadingStatus: LoadingStatus = results.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
        this._state.update(s => ({...s, trophies: {...s.trophies, results, total: searchResult.total, loadingStatus}}));
      },
      error: () => {
        this._errorService.logErrorAndRedirect('Failed loading trophies for profil: ' + userProfileId);
        this._state.update(s => ({...s, trophies: {...s.trophies, loadingStatus: LoadingStatus.ERROR}}));
      },
    });
  }

  loadMoreTrophies(userProfileId: string | null): void {
    if (null == userProfileId) {
      this._errorService.logErrorAndRedirect('Invalid user id');
      return;
    }
    this._state.update(s => ({...s, trophies: {...s.trophies, pageNumber: s.trophies.pageNumber + 1}}));
    this.searchTrophies(userProfileId);
  }

}
