import {computed, Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {PlayerHttpService} from "../../core/api/services/player-http.service";
import {PlayedTrophySetSearchElement} from "../../core/api/dtos/trophy-set/played-trophy-set-search-element";

@Injectable({
    providedIn: 'root',
})
export class ProfileTrophySetListStore {
    private readonly _pageSize = 20;
    private readonly _pageNumber = signal<number>(0);
    private readonly _trophySets = signal<PlayedTrophySetSearchElement[]>([]);
    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);

    readonly trophySets = computed(() => this._trophySets());
    readonly status = computed(() => this._status());

    constructor(private readonly _playerService: PlayerHttpService) {
    }

    reset(): void {
        this._trophySets.set([]);
        this._pageNumber.set(0);
        this._status.set(LoadingStatus.NONE);
    }

    search(playerId: string | null): void {
        if (playerId == null) {
            console.error('Invalid player id');
            this._status.set(LoadingStatus.ERROR);
            return;
        }

        this._status.set(LoadingStatus.LOADING);
        this._playerService.searchPlayedTrophySets(playerId, this._pageNumber(), this._pageSize).subscribe({
            next: searchResult => {
                const trophySets = [...this._trophySets(), ...searchResult.content];
                const loadingStatus: LoadingStatus = trophySets.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
                this._trophySets.update(() => trophySets);
                this._status.set(loadingStatus);
            },
            error: () => {
                console.error(`Failed loading trophy sets for player ${playerId}`);
                this._status.set(LoadingStatus.ERROR);
            }
        })
    }

    loadMore(playerId: string | null): void {
        this._pageNumber.update(n => n + 1);
        this.search(playerId);
    }
}
