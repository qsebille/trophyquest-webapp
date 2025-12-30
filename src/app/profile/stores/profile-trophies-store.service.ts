import {computed, Injectable, signal} from '@angular/core';
import {Trophy} from "../../core/models/dto/trophy";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {PlayerService} from "../../core/services/http/player.service";

@Injectable({
    providedIn: 'root',
})
export class ProfileTrophiesStore {
    private readonly _pageSize = 20;
    private readonly _pageNumber = signal<number>(0);

    private readonly _trophies = signal<Trophy[]>([]);
    readonly trophies = computed(() => this._trophies());

    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);
    readonly status = computed(() => this._status());

    constructor(private readonly _playerService: PlayerService) {
    }

    reset(): void {
        this._trophies.set([]);
        this._pageNumber.set(0);
        this._status.set(LoadingStatus.NONE);
    }

    searchTrophies(playerId: string | null): void {
        if (null == playerId) {
            console.error('Invalid player id');
            this._status.set(LoadingStatus.ERROR);
            return;
        }

        this._status.set(LoadingStatus.LOADING);
        this._playerService.searchEarnedTrophies(playerId, this._pageNumber(), this._pageSize).subscribe({
            next: searchResult => {
                const trophies = [...this._trophies(), ...searchResult.content] as Trophy[];
                const loadingStatus: LoadingStatus = trophies.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
                this._trophies.update(() => trophies);
                this._status.set(loadingStatus);
            },
            error: () => {
                console.error(`Failed loading trophies for player ${playerId}`);
                this._status.set(LoadingStatus.ERROR);
            }
        });
    }

    loadMoreTrophies(playerId: string | null): void {
        this._pageNumber.update(n => n + 1);
        this.searchTrophies(playerId);
    }
}
