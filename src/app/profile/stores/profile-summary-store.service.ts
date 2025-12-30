import {computed, Injectable, signal} from '@angular/core';
import {EMPTY_PLAYER, Player} from "../../core/models/dto/player";
import {EMPTY_TROPHY_COUNT_PER_TYPE, TrophyCountPerType} from "../../core/models/dto/trophy-count-per-type";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {forkJoin} from "rxjs";
import {PlayerService} from "../../core/services/http/player.service";

@Injectable({
    providedIn: 'root',
})
export class ProfileSummaryStore {
    private _player = signal<Player>(EMPTY_PLAYER);
    readonly player = computed(() => this._player());

    private _totalGames = signal<number>(0);
    readonly totalGames = computed(() => this._totalGames());

    private _trophyCountPerType = signal<TrophyCountPerType>(EMPTY_TROPHY_COUNT_PER_TYPE);
    readonly trophyCountPerType = computed(() => this._trophyCountPerType());

    private _status = signal<LoadingStatus>(LoadingStatus.NONE);
    readonly status = computed(() => this._status());

    constructor(private readonly _playerService: PlayerService) {
    }

    reset(): void {
        this._player.set(EMPTY_PLAYER);
        this._totalGames.set(0);
        this._trophyCountPerType.set(EMPTY_TROPHY_COUNT_PER_TYPE);
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
                    this._totalGames.set(gameCount);
                    this._trophyCountPerType.set(trophyCount);
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
