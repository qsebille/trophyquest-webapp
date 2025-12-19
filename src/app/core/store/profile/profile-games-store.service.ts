import {computed, Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../models/loading-status.enum";
import {PlayerService} from "../../services/http/player.service";
import {PlayerGame} from "../../models/dto/player-game";

@Injectable({
    providedIn: 'root',
})
export class ProfileGamesStore {
    private readonly _pageSize = 20;

    private _pageNumber = signal<number>(0);
    private readonly _games = signal<PlayerGame[]>([]);
    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);

    readonly games = computed(() => this._games());
    readonly isLoading = computed(() => this._status() === LoadingStatus.LOADING);
    readonly isError = computed(() => this._status() === LoadingStatus.ERROR);
    readonly isPartiallyLoaded = computed(() => this._status() === LoadingStatus.PARTIALLY_LOADED);

    constructor(private readonly _playerService: PlayerService) {
    }

    reset(): void {
        this._games.set([]);
        this._pageNumber.set(0);
        this._status.set(LoadingStatus.NONE);
    }

    searchGames(playerId: string | null): void {
        if (null == playerId) {
            console.error('Invalid player id');
            this._status.set(LoadingStatus.ERROR);
            return;
        }

        this._status.set(LoadingStatus.LOADING);
        this._playerService.searchGames(playerId, this._pageNumber(), this._pageSize).subscribe({
            next: searchResult => {
                const games = [...this._games(), ...searchResult.content] as PlayerGame[];
                const loadingStatus: LoadingStatus = games.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
                this._games.update(() => games);
                this._status.set(loadingStatus);
            },
            error: () => {
                console.error(`Failed loading games for player ${playerId}`);
                this._status.set(LoadingStatus.ERROR);
            }
        })
    }

    loadMoreGames(playerId: string | null): void {
        this._pageNumber.update(n => n + 1);
        this.searchGames(playerId);
    }

}
