import {computed, Injectable, signal} from '@angular/core';
import {PopularGame} from "../../core/models/dto/popular-game";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {GameService} from "../../core/services/http/game.service";

@Injectable({
    providedIn: 'root',
})
export class HomePopularGamesStore {
    private readonly _games = signal<PopularGame[]>([]);
    readonly games = computed(() => this._games());

    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);
    readonly status = computed(() => this._status());


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
