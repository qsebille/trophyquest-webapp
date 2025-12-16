import {computed, Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../models/loading-status.enum";
import {PlayerService} from "../../services/http/player.service";
import {GameService} from "../../services/http/game.service";
import {TrophyService} from "../../services/http/trophy.service";
import {forkJoin} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class HomeSummaryStoreService {
    private _loadingStatus = signal<LoadingStatus>(LoadingStatus.NONE);
    private _nbGames = signal<number>(0);
    private _nbPlayers = signal<number>(0);
    private _nbTrophies = signal<number>(0);

    readonly nbGames = computed(() => this._nbGames());
    readonly nbPlayers = computed(() => this._nbPlayers());
    readonly nbEarnedTrophies = computed(() => this._nbTrophies());
    readonly isLoading = computed(() => this._loadingStatus() === LoadingStatus.LOADING);
    readonly isError = computed(() => this._loadingStatus() === LoadingStatus.ERROR);

    constructor(
        private readonly _playerService: PlayerService,
        private readonly _gameService: GameService,
        private readonly _trophyService: TrophyService,
    ) {
    }

    fetch(): void {
        this._loadingStatus.set(LoadingStatus.LOADING);
        forkJoin({
            players: this._playerService.count(),
            games: this._gameService.count(),
            trophies: this._trophyService.countObtained(),
        }).subscribe({
            next: ({players, games, trophies}) => {
                this._nbPlayers.set(players);
                this._nbGames.set(games);
                this._nbTrophies.set(trophies);
                this._loadingStatus.set(LoadingStatus.FULLY_LOADED);
            },
            error: error => {
                console.error(error);
                this._loadingStatus.set(LoadingStatus.ERROR);
            }
        });
    }
}
