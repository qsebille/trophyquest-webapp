import {computed, Injectable, signal} from '@angular/core';
import {EMPTY_PLAYER, Player} from "../../models/dto/player";
import {EMPTY_TROPHY_COUNT_PER_TYPE, TrophyCountPerType} from "../../models/dto/trophy-count-per-type";
import {LoadingStatus} from "../../models/loading-status.enum";
import {forkJoin} from "rxjs";
import {PlayerService} from "../../services/http/player.service";

@Injectable({
    providedIn: 'root',
})
export class ProfileSummaryStore {
    private _player = signal<Player>(EMPTY_PLAYER);
    private _gameCount = signal<number>(0);
    private _trophyCount = signal<TrophyCountPerType>(EMPTY_TROPHY_COUNT_PER_TYPE);
    private _status = signal<LoadingStatus>(LoadingStatus.NONE);

    readonly player = computed(() => this._player());
    readonly gameCount = computed(() => this._gameCount());
    readonly trophyCountPerType = computed(() => this._trophyCount());
    readonly isLoading = computed(() => this._status() === LoadingStatus.LOADING);
    readonly isError = computed(() => this._status() === LoadingStatus.ERROR);

    constructor(private readonly _playerService: PlayerService) {
    }

    reset(): void {
        this._player.set(EMPTY_PLAYER);
        this._gameCount.set(0);
        this._trophyCount.set(EMPTY_TROPHY_COUNT_PER_TYPE);
        this._status.set(LoadingStatus.NONE);
    }

    retrieve(playerId: string | null): void {
        if (null == playerId) {
            console.error('Invalid player id');
            this._status.set(LoadingStatus.ERROR);
            return;
        }

        this._status.set(LoadingStatus.LOADING);
        forkJoin({
            player: this._playerService.retrieve(playerId),
            gameCount: this._playerService.countPlayedGames(playerId),
            trophyCount: this._playerService.getTrophyCountPerType(playerId),
        }).subscribe({
                next: ({player, trophyCount, gameCount}) => {
                    this._player.set(player);
                    this._gameCount.set(gameCount);
                    this._trophyCount.set(trophyCount);
                    this._status.set(LoadingStatus.FULLY_LOADED);
                },
                error: error => {
                    console.error(error);
                    this._status.set(LoadingStatus.ERROR);
                }
            }
        )
    }
}
