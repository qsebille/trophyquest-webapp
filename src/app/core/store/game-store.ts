import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Game} from '../models/dto/game';
import {GameService} from '../services/game.service';
import {LoadingStatus} from '../models/loading-status.enum';
import {UserService} from '../services/user.service';

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

  public loadNextPage(): void {
    this._pageNumber.set(this._pageNumber() + 1);
    this.searchGames();
  }

  public resetSearch(): void {
    this._list.set([]);
    this._totalElements.set(0);
    this._loadingStatus.set(LoadingStatus.NONE);
    this._pageNumber.set(0);
  }

  public searchGames(): void {
    this._loadingStatus.set(LoadingStatus.LOADING);

    this._gameService.searchGames(this._pageNumber(), this._pageSize()).subscribe({
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
