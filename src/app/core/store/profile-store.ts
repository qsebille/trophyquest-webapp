import {computed, Injectable, signal} from '@angular/core';
import {PlayerService} from '../services/player.service';
import {forkJoin} from 'rxjs';
import {ProfileState} from '../models/states/profile-state';
import {ErrorService} from '../services/error.service';
import {LoadingStatus} from '../models/loading-status.enum';
import {Trophy} from '../models/dto/trophy';
import {PlayerCollection} from '../models/dto/player-collection';

@Injectable({
  providedIn: 'root',
})
export class ProfileStore {
  private readonly INITIAL_STATE: ProfileState = {
    player: {
      id: "",
      pseudo: "",
      avatarUrl: "",
    },
    collections: {
      results: [],
      total: 0,
      pageNumber: 0,
      pageSize: 20,
      loadingStatus: LoadingStatus.NONE,
    },
    trophies: {
      results: [],
      total: 0,
      pageNumber: 0,
      pageSize: 20,
      loadingStatus: LoadingStatus.NONE,
    },
    gameCount: 0,
    trophyCount: {platinum: 0, gold: 0, silver: 0, bronze: 0},
  }

  private readonly _state = signal<ProfileState>(this.INITIAL_STATE);
  readonly player = computed(() => this._state().player);
  readonly collections = computed(() => this._state().collections.results);
  readonly hasMoreCollections = computed(() => this._state().collections.loadingStatus === LoadingStatus.PARTIALLY_LOADED);
  readonly isLoadingCollections = computed(() => this._state().collections.loadingStatus === LoadingStatus.LOADING);
  readonly hasNoCollections = computed(() => this._state().collections.results.length === 0 && this._state().collections.loadingStatus === LoadingStatus.FULLY_LOADED);
  readonly hasErrorLoadingCollections = computed(() => this._state().collections.loadingStatus === LoadingStatus.ERROR);
  readonly trophies = computed(() => this._state().trophies.results);
  readonly hasMoreTrophies = computed(() => this._state().trophies.loadingStatus === LoadingStatus.PARTIALLY_LOADED);
  readonly isLoadingTrophies = computed(() => this._state().trophies.loadingStatus === LoadingStatus.LOADING);
  readonly hasNoTrophies = computed(() => this._state().trophies.results.length === 0 && this._state().trophies.loadingStatus === LoadingStatus.FULLY_LOADED);
  readonly hasErrorLoadingTrophies = computed(() => this._state().trophies.loadingStatus === LoadingStatus.ERROR);
  readonly trophyCount = computed(() => this._state().trophyCount);
  readonly totalPlayedGames = computed(() => this._state().gameCount);
  readonly totalEarnedTrophies = computed(() => this._state().trophyCount.platinum + this._state().trophyCount.gold + this._state().trophyCount.silver + this._state().trophyCount.bronze);

  constructor(
    private readonly _playerService: PlayerService,
    private readonly _errorService: ErrorService
  ) {
  }

  reset(): void {
    this._state.set(this.INITIAL_STATE);
  }

  retrieve(playerId: string | null): void {
    if (null == playerId) {
      this._errorService.logErrorAndRedirect('Invalid player id');
      return;
    }

    forkJoin({
      player: this._playerService.retrieve(playerId),
      gameCount: this._playerService.countPlayedGames(playerId),
      trophyCount: this._playerService.countEarnedTrophies(playerId),
    }).subscribe({
      next: ({player, trophyCount, gameCount}) => this._state.update(s => ({...s, player, gameCount, trophyCount})),
      error: () => this._errorService.logErrorAndRedirect('Failed loading profile: ' + playerId),
    });
  }

  searchCollections(playerId: string | null): void {
    if (null == playerId) {
      this._errorService.logErrorAndRedirect('Invalid player id');
      return;
    }

    this._state.update(s => ({...s, collections: {...s.collections, loadingStatus: LoadingStatus.LOADING}}));
    this._playerService.searchCollections(playerId, this._state().collections.pageNumber, this._state().collections.pageSize).subscribe({
      next: searchResult => {
        const collections = [...this._state().collections.results, ...searchResult.content] as PlayerCollection[];
        const loadingStatus: LoadingStatus = collections.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
        this._state.update(s => ({
          ...s,
          collections: {...s.collections, results: collections, total: searchResult.total, loadingStatus}
        }));
      },
      error: () => {
        console.error(`Failed loading games for player ${playerId}`);
        this._state.update(s => ({...s, collections: {...s.collections, loadingStatus: LoadingStatus.ERROR}}));
      },
    });
  }

  loadMoreCollections(playerId: string | null): void {
    this._state.update(s => ({...s, collections: {...s.collections, pageNumber: s.collections.pageNumber + 1}}));
    this.searchCollections(playerId);
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
        console.error(`Failed loading trophies for player ${playerId}`);
        this._state.update(s => ({...s, trophies: {...s.trophies, loadingStatus: LoadingStatus.ERROR}}));
      },
    });
  }

  loadMoreTrophies(playerId: string | null): void {
    this._state.update(s => ({...s, trophies: {...s.trophies, pageNumber: s.trophies.pageNumber + 1}}));
    this.searchTrophies(playerId);
  }

}
