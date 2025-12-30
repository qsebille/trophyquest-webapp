import {computed, Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {PlayerService} from "../../core/services/http/player.service";
import {GameService} from "../../core/services/http/game.service";
import {TrophyService} from "../../core/services/http/trophy.service";
import {forkJoin} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class HomeSummaryStoreService {
    private _status = signal<LoadingStatus>(LoadingStatus.NONE);
    private _nbGames = signal<number>(0);
    private _nbPlayers = signal<number>(0);
    private _nbTrophies = signal<number>(0);

    readonly nbGames = computed(() => this._nbGames());
    readonly nbPlayers = computed(() => this._nbPlayers());
    readonly nbEarnedTrophies = computed(() => this._nbTrophies());
    readonly status = computed(() => this._status());

    constructor(
        private readonly _playerService: PlayerService,
        private readonly _gameService: GameService,
        private readonly _trophyService: TrophyService,
    ) {
    }

    fetch(): void {
        this._status.set(LoadingStatus.LOADING);
        forkJoin({
            players: this._playerService.count(),
            games: this._gameService.count(),
            trophies: this._trophyService.countObtained(),
        }).subscribe({
            next: ({players, games, trophies}) => {
                this._nbPlayers.set(players);
                this._nbGames.set(games);
                this._nbTrophies.set(trophies);
                this._status.set(LoadingStatus.FULLY_LOADED);
            },
            error: error => {
                console.error(error);
                this._status.set(LoadingStatus.ERROR);
            }
        });
    }
}
