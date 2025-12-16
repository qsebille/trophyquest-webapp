import {computed, Injectable, signal} from '@angular/core';
import {RecentlyPlayedGame} from "../../models/dto/recently-played-game";
import {LoadingStatus} from "../../models/loading-status.enum";
import {GameService} from "../../services/http/game.service";

@Injectable({
    providedIn: 'root',
})
export class HomeGameStoreService {
    private _games = signal<RecentlyPlayedGame[]>([]);
    private _status = signal<LoadingStatus>(LoadingStatus.NONE);

    readonly games = computed(() => this._games());
    readonly isLoading = computed(() => this._status() === LoadingStatus.LOADING);
    readonly isError = computed(() => this._status() === LoadingStatus.ERROR);

    constructor(private readonly _gameService: GameService) {
    }

    fetch(): void {
        console.info('Fetching recently played games...');
        this._status.set(LoadingStatus.LOADING);
        this._gameService.searchRecentGames().subscribe({
            next: games => {
                this._games.set(games);
                this._status.set(LoadingStatus.FULLY_LOADED);
            },
            error: error => {
                console.error(error);
                this._status.set(LoadingStatus.ERROR);
            }
        })
    }
}
