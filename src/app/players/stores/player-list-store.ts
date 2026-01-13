import {computed, Injectable, signal} from '@angular/core';
import {PlayerHttpService} from '../../core/api/services/player-http.service';
import {LoadingStatus} from '../../core/models/loading-status.enum';
import {PlayerSearchItem} from "../../core/api/dtos/player/player-search-item";
import {forkJoin} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class PlayerListStore {
    private readonly _pageSize = 20;

    private _pageNumber = signal<number>(0);
    private _results = signal<PlayerSearchItem[]>([]);
    private _total = signal<number>(0);
    private _status = signal<LoadingStatus>(LoadingStatus.NONE);

    readonly results = computed(() => this._results());
    readonly total = computed(() => this._total());
    readonly status = computed(() => this._status());

    constructor(private readonly _playerService: PlayerHttpService) {
    }

    reset(): void {
        this._pageNumber.set(0);
        this._results.set([]);
        this._total.set(0);
        this._status.set(LoadingStatus.NONE);
    }

    search(): void {
        this._status.set(LoadingStatus.LOADING);

        forkJoin({
            list: this._playerService.search(this._pageNumber(), this._pageSize),
            count: this._playerService.count()
        }).subscribe({
            next: ({list, count}) => {
                const players = [...this.results(), ...list];
                const loadingStatus: LoadingStatus = players.length < count ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
                this._results.update(() => players);
                this._total.set(count);
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
