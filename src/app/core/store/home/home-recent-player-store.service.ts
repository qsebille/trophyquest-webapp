import {computed, Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../models/loading-status.enum";
import {RecentPlayerResponse} from "../../models/dto/recent-player-response";
import {PlayerService} from "../../services/http/player.service";

@Injectable({
    providedIn: 'root',
})
export class HomeRecentPlayerStoreService {
    private _loadingStatus = signal<LoadingStatus>(LoadingStatus.NONE);
    private _list = signal<RecentPlayerResponse[]>([]);

    readonly list = computed(() => this._list());
    readonly isLoading = computed(() => this._loadingStatus() === LoadingStatus.LOADING);
    readonly isError = computed(() => this._loadingStatus() === LoadingStatus.ERROR);

    constructor(private readonly _playerService: PlayerService) {
    }

    fetch() {
        console.info('Fetching recent players...');
        this._loadingStatus.set(LoadingStatus.LOADING);
        this._playerService.fetchRecentPlayers().subscribe({
            next: players => {
                this._list.set(players);
                this._loadingStatus.set(LoadingStatus.FULLY_LOADED);
            },
            error: error => {
                console.error(error);
                this._loadingStatus.set(LoadingStatus.ERROR);
            }
        });
    }
}
