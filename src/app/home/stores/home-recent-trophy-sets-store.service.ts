import {computed, Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {TrophySetHttpService} from "../../core/api/services/trophy-set-http.service";
import {RecentTrophySet} from "../../core/api/dtos/trophy-set/recent-trophy-set";

@Injectable({
    providedIn: 'root',
})
export class HomeRecentTrophySetsStore {
    private readonly _trophySets = signal<RecentTrophySet[]>([]);
    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);

    readonly trophySets = computed(() => this._trophySets());
    readonly status = computed(() => this._status());

    constructor(private readonly _trophySetService: TrophySetHttpService) {
    }

    fetch(): void {
        this._status.set(LoadingStatus.LOADING);
        this._trophySetService.fetchRecent().subscribe({
            next: trophySets => {
                this._trophySets.set(trophySets);
                this._status.set(LoadingStatus.FULLY_LOADED);
            },
            error: error => {
                console.error('Failed to fetch recent trophy sets', error);
                this._status.set(LoadingStatus.ERROR);
            }
        });
    }
}
