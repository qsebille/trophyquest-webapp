import {computed, Injectable, signal} from '@angular/core';
import {PlayerService} from '../services/player.service';
import {forkJoin} from 'rxjs';
import {ProfileState} from '../models/states/profile-state';
import {ErrorService} from '../services/error.service';
import {SearchState} from '../models/states/search-state';
import {LoadingStatus} from '../models/loading-status.enum';
import {PlayerGameAchievements} from '../models/dto/player-game-achievements';
import {Trophy} from '../models/dto/trophy';

@Injectable({
  providedIn: 'root',
})
export class ProfileStore {
  private readonly INITIAL_GAME_STATE: SearchState<PlayerGameAchievements> = {
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
    playerId: "",
    player: undefined,
    games: this.INITIAL_GAME_STATE,
    trophies: this.INITIAL_TROPHY_STATE,
    trophyCount: {platinum: 0, gold: 0, silver: 0, bronze: 0},
  }

  private readonly _state = signal<ProfileState>(this.INITIAL_STATE);
  readonly player = computed(() => this._state().player);
  readonly gameResults = computed(() => this._state().games.results);
  readonly hasMoreGames = computed(() => this._state().games.loadingStatus === LoadingStatus.PARTIALLY_LOADED);
  readonly isLoadingGames = computed(() => this._state().games.loadingStatus === LoadingStatus.LOADING);
  readonly trophyResults = computed(() => this._state().trophies.results);
  readonly trophyCount = computed(() => this._state().trophyCount);
  readonly hasMoreTrophies = computed(() => this._state().trophies.loadingStatus === LoadingStatus.PARTIALLY_LOADED);
  readonly isLoadingTrophies = computed(() => this._state().trophies.loadingStatus === LoadingStatus.LOADING);

  constructor(
    private readonly _playerService: PlayerService,
    private readonly _errorService: ErrorService
  ) {
  }

  reset(): void {
    this._state.set(this.INITIAL_STATE);
  }

  fetch(playerId: string | null): void {
    if (null == playerId) {
      this._errorService.logErrorAndRedirect('Invalid player id');
      return;
    }

    forkJoin({
      player: this._playerService.fetch(playerId),
      trophyCount: this._playerService.getTrophyCount(playerId),
    }).subscribe({
      next: ({player, trophyCount}) => this._state.update(s => ({...s, playerId: playerId, player, trophyCount})),
      error: () => this._errorService.logErrorAndRedirect('Failed loading profile: ' + playerId),
    });
  }

  searchGames(playerId: string | null): void {
    if (null == playerId) {
      this._errorService.logErrorAndRedirect('Invalid player id');
      return;
    }

    this._state.update(s => ({...s, games: {...s.games, loadingStatus: LoadingStatus.LOADING}}));
    this._playerService.searchGames(playerId, this._state().games.pageNumber, this._state().games.pageSize).subscribe({
      next: searchResult => {
        const games = [...this._state().games.results, ...searchResult.content] as PlayerGameAchievements[];
        const loadingStatus: LoadingStatus = games.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
        this._state.update(s => ({
          ...s,
          games: {...s.games, results: games, total: searchResult.total, loadingStatus: loadingStatus}
        }));
      },
      error: () => {
        this._errorService.logErrorAndRedirect('Failed loading games for profile: ' + playerId)
        this._state.update(s => ({...s, games: {...s.games, loadingStatus: LoadingStatus.ERROR}}));
      },
    });
  }

  loadMoreGames(playerId: string | null): void {
    if (null == playerId) {
      this._errorService.logErrorAndRedirect('Invalid player id');
      return;
    }

    this._state.update(s => ({...s, games: {...s.games, pageNumber: s.games.pageNumber + 1}}));
    this.searchGames(playerId);
  }

  searchTrophies(playerId: string | null): void {
    if (null == playerId) {
      this._errorService.logErrorAndRedirect('Invalid player id');
      return;
    }

    this._state.update(s => ({...s, trophies: {...s.trophies, loadingStatus: LoadingStatus.LOADING}}));
    this._playerService.searchEarnedTrophies(playerId, this._state().trophies.pageNumber, this._state().trophies.pageSize).subscribe({
      next: searchResult => {
        const results = [...this._state().trophies.results, ...searchResult.content] as Trophy[];
        const loadingStatus: LoadingStatus = results.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
        this._state.update(s => ({...s, trophies: {...s.trophies, results, total: searchResult.total, loadingStatus}}));
      },
      error: () => {
        this._errorService.logErrorAndRedirect('Failed loading trophies for player: ' + playerId);
        this._state.update(s => ({...s, trophies: {...s.trophies, loadingStatus: LoadingStatus.ERROR}}));
      },
    });
  }

  loadMoreTrophies(playerId: string | null): void {
    if (null == playerId) {
      this._errorService.logErrorAndRedirect('Invalid player id');
      return;
    }
    this._state.update(s => ({...s, trophies: {...s.trophies, pageNumber: s.trophies.pageNumber + 1}}));
    this.searchTrophies(playerId);
  }

}
