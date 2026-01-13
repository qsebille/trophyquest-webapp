import {computed, Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {PlayerHttpService} from "../../core/api/services/player-http.service";
import {TrophySetHttpService} from "../../core/api/services/trophy-set-http.service";
import {TrophyHttpService} from "../../core/api/services/trophy-http.service";
import {forkJoin} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class HomeStatsStore {
    private readonly _playerCount = signal<number>(0);
    private readonly _recentPlayerCount = signal<number>(0);
    private readonly _trophySetCount = signal<number>(0);
    private readonly _recentTrophySetCount = signal<number>(0);
    private readonly _trophyCount = signal<number>(0);
    private readonly _recentTrophyCount = signal<number>(0);
    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);

    readonly playerCount = computed(() => this._playerCount());
    readonly recentPlayerCount = computed(() => this._recentPlayerCount());
    readonly trophySetCount = computed(() => this._trophySetCount());
    readonly recentTrophySetCount = computed(() => this._recentTrophySetCount());
    readonly trophyCount = computed(() => this._trophyCount());
    readonly recentTrophyCount = computed(() => this._recentTrophyCount());
    readonly status = computed(() => this._status());

    constructor(
        private readonly _playerService: PlayerHttpService,
        private readonly _trophySetService: TrophySetHttpService,
        private readonly _trophyService: TrophyHttpService,
    ) {
    }

    retrieve(): void {
        this._status.set(LoadingStatus.LOADING);

        forkJoin({
            playerCount: this._playerService.count(),
            trophySetCount: this._trophySetService.count(),
            trophyCount: this._trophyService.count(),
            recentPlayerCount: this._playerService.countRecent(),
            recentTrophySetCount: this._trophySetService.countRecent(),
            recentTrophyCount: this._trophyService.countRecentlyEarned(),
        }).subscribe({
            next: ({
                       playerCount,
                       trophySetCount,
                       trophyCount,
                       recentPlayerCount,
                       recentTrophySetCount,
                       recentTrophyCount
                   }) => {
                this._playerCount.set(playerCount);
                this._trophySetCount.set(trophySetCount);
                this._trophyCount.set(trophyCount);
                this._recentPlayerCount.set(recentPlayerCount);
                this._recentTrophySetCount.set(recentTrophySetCount);
                this._recentTrophyCount.set(recentTrophyCount);
                this._status.set(LoadingStatus.FULLY_LOADED);
            },
            error: error => {
                console.error('Failed to load stats', error);
                this._status.set(LoadingStatus.ERROR);
            }
        })
    }
}
