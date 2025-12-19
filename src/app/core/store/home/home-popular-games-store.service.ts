import {computed, Injectable, signal} from '@angular/core';
import {PopularGame} from "../../models/dto/popular-game";
import {LoadingStatus} from "../../models/loading-status.enum";
import {GameService} from "../../services/http/game.service";

@Injectable({
    providedIn: 'root',
})
export class HomePopularGamesStoreService {
    private _games = signal<PopularGame[]>([]);
    private _status = signal<LoadingStatus>(LoadingStatus.NONE);

    readonly games = computed(() => this._games());
    readonly isLoading = computed(() => this._status() === LoadingStatus.LOADING);
    readonly isError = computed(() => this._status() === LoadingStatus.ERROR);

    constructor(private readonly _gameService: GameService) {
    }

    fetch(): void {
        console.info('Fetching recently played games...');
        this._status.set(LoadingStatus.LOADING);
        this._gameService.searchPopularGames().subscribe({
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
