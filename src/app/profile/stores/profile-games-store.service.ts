import {computed, Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {PlayerService} from "../../core/services/http/player.service";
import {PlayerGame} from "../../core/models/dto/player-game";

@Injectable({
    providedIn: 'root',
})
export class ProfileGamesStore {
    private readonly _pageSize = 20;
    private readonly _pageNumber = signal<number>(0);

    private readonly _games = signal<PlayerGame[]>([]);
    readonly games = computed(() => this._games());

    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);
    readonly status = computed(() => this._status());

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
