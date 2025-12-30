import {computed, Injectable, signal} from '@angular/core';
import {PlayerService} from '../../core/services/http/player.service';
import {LoadingStatus} from '../../core/models/loading-status.enum';
import {PlayerSummary} from '../../core/models/dto/player-summary';

@Injectable({
    providedIn: 'root',
})
export class PlayerListStore {
    private readonly _pageSize = 20;

    private _pageNumber = signal<number>(0);
    private _results = signal<PlayerSummary[]>([]);
    private _total = signal<number>(0);
    private _status = signal<LoadingStatus>(LoadingStatus.NONE);

    readonly playerSummaries = computed(() => this._results());
    readonly total = computed(() => this._total());
    readonly status = computed(() => this._status());

    constructor(private readonly _playerService: PlayerService) {
    }

    reset(): void {
        this._pageNumber.set(0);
        this._results.set([]);
        this._total.set(0);
        this._status.set(LoadingStatus.NONE);
    }

    search(): void {
        this._status.set(LoadingStatus.LOADING);
        this._playerService.search(this._pageNumber(), this._pageSize).subscribe({
            next: searchResult => {
                const players = [...this._results(), ...searchResult.content] as PlayerSummary[];
                const loadingStatus: LoadingStatus = players.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
                this._results.update(() => players);
                this._total.set(searchResult.total);
                this._status.set(loadingStatus);
            },
            error: error => {
                this._status.set(LoadingStatus.ERROR);
                console.error(error)
            },
        });
    }

    loadMore(): void {
        this._pageNumber.update(n => n + 1);
        this.search();
    }
}
