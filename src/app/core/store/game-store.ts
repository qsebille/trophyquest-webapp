import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Game} from '../models/dto/game';
import {GameService} from '../services/game.service';
import {LoadingStatus} from '../models/loading-status.enum';
import {UserService} from '../services/user.service';
import {GameSearchResult} from '../models/dto/game-search-result';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameStore {
  private readonly _pageNumber: WritableSignal<number> = signal<number>(0);
  private readonly _pageSize: WritableSignal<number> = signal<number>(40);

  private readonly _list: WritableSignal<Game[]> = signal<Game[]>([]);
  readonly list: Signal<Game[]> = computed(() => this._list());

  private readonly _totalElements: WritableSignal<number> = signal<number>(0);
  readonly totalElements: Signal<number> = computed(() => this._totalElements());

  private readonly _loadingStatus: WritableSignal<LoadingStatus> = signal(LoadingStatus.NONE);
  readonly loadingStatus: Signal<LoadingStatus> = computed(() => this._loadingStatus());


  constructor(
    private _gameService: GameService,
    private _userService: UserService,
  ) {
  }

  public loadNextPage(userId: string | undefined = undefined): void {
    this._pageNumber.set(this._pageNumber() + 1);
    this.searchGames(userId);
  }

  public searchGames(userId: string | undefined = undefined): void {
    this._loadingStatus.set(LoadingStatus.LOADING);

    const searchResult: Observable<GameSearchResult> = (userId === undefined) ?
      this._gameService.searchGames(this._pageNumber(), this._pageSize()) :
      this._userService.searchUserGames(userId, this._pageNumber(), this._pageSize());

    searchResult.subscribe({
      next: result => {
        this._list.update((current) => [...current, ...result.content]);
        this._totalElements.set(result.totalElements);
        this._loadingStatus.set(LoadingStatus.SUCCESS);
      },
      error: error => {
        console.error(error);
        this._loadingStatus.set(LoadingStatus.ERROR);
      }
    });
  }

}
