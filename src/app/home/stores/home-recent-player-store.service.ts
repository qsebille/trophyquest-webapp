import {computed, Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {RecentPlayerResponse} from "../../core/models/dto/recent-player-response";
import {PlayerService} from "../../core/services/http/player.service";

@Injectable({
    providedIn: 'root',
})
export class HomeRecentPlayerStoreService {
    private readonly _players = signal<RecentPlayerResponse[]>([]);
    readonly players = computed(() => this._players());

    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);
    readonly status = computed(() => this._status());

    constructor(private readonly _playerService: PlayerService) {
    }

    fetch() {
        console.info('Fetching recent players...');
        this._status.set(LoadingStatus.LOADING);
        this._playerService.fetchRecentPlayers().subscribe({
            next: players => {
                this._players.set(players);
                this._status.set(LoadingStatus.FULLY_LOADED);
            },
            error: error => {
                console.error(error);
                this._status.set(LoadingStatus.ERROR);
            }
        });
    }
}
