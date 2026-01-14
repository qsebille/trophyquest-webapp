import {computed, Injectable, signal} from '@angular/core';
import {RecentPlayerTrophies} from "../../core/api/dtos/player/recent-player-trophies";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {PlayerHttpService} from "../../core/api/services/player-http.service";

@Injectable({
    providedIn: 'root',
})
export class HomeRecentPlayersStore {
    private readonly _players = signal<RecentPlayerTrophies[]>([]);
    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);

    readonly players = computed(() => this._players());
    readonly status = computed(() => this._status());

    constructor(private readonly _playerService: PlayerHttpService) {
    }

    fetch(): void {
        this._status.set(LoadingStatus.LOADING);
        this._playerService.fetchTopRecent().subscribe({
            next: players => {
                this._players.set(players);
                this._status.set(LoadingStatus.FULLY_LOADED);
            },
            error: error => {
                console.error('Failed to fetch recent players', error);
                this._status.set(LoadingStatus.ERROR);
            }
        });
    }
}
