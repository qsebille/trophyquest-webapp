import {computed, Injectable, signal} from '@angular/core';
import {PlayerService} from '../services/http/player.service';
import {forkJoin} from 'rxjs';
import {ProfileState} from '../models/states/profile-state';
import {LoadingStatus} from '../models/loading-status.enum';
import {Trophy} from '../models/dto/trophy';
import {PlayerGame} from '../models/dto/player-game';
import {NavigatorService} from "../services/utils/navigator.service";

@Injectable({
    providedIn: 'root',
})
export class ProfileStore {
    private readonly INITIAL_STATE: ProfileState = {
        player: {
            id: "",
            pseudo: "",
            avatarUrl: "",
        },
        games: {
            results: [],
            total: 0,
            pageNumber: 0,
            pageSize: 20,
            loadingStatus: LoadingStatus.NONE,
        },
        trophies: {
            results: [],
            total: 0,
            pageNumber: 0,
            pageSize: 20,
            loadingStatus: LoadingStatus.NONE,
        },
        gameCount: 0,
        trophyCount: {platinum: 0, gold: 0, silver: 0, bronze: 0},
    }

    private readonly _state = signal<ProfileState>(this.INITIAL_STATE);
    readonly player = computed(() => this._state().player);
    readonly games = computed(() => this._state().games.results);
    readonly hasMoreGames = computed(() => this._state().games.loadingStatus === LoadingStatus.PARTIALLY_LOADED);
    readonly isLoadingGames = computed(() => this._state().games.loadingStatus === LoadingStatus.LOADING);
    readonly hasNoGames = computed(() => this._state().games.results.length === 0 && this._state().games.loadingStatus === LoadingStatus.FULLY_LOADED);
    readonly hasErrorLoadingGames = computed(() => this._state().games.loadingStatus === LoadingStatus.ERROR);
    readonly trophies = computed(() => this._state().trophies.results);
    readonly hasMoreTrophies = computed(() => this._state().trophies.loadingStatus === LoadingStatus.PARTIALLY_LOADED);
    readonly isLoadingTrophies = computed(() => this._state().trophies.loadingStatus === LoadingStatus.LOADING);
    readonly hasNoTrophies = computed(() => this._state().trophies.results.length === 0 && this._state().trophies.loadingStatus === LoadingStatus.FULLY_LOADED);
    readonly hasErrorLoadingTrophies = computed(() => this._state().trophies.loadingStatus === LoadingStatus.ERROR);
    readonly trophyCount = computed(() => this._state().trophyCount);
    readonly totalPlayedGames = computed(() => this._state().gameCount);
    readonly totalEarnedTrophies = computed(() => this._state().trophyCount.platinum + this._state().trophyCount.gold + this._state().trophyCount.silver + this._state().trophyCount.bronze);

    constructor(
        private readonly _playerService: PlayerService,
        private readonly _navigator: NavigatorService
    ) {
    }

    reset(): void {
        this._state.set(this.INITIAL_STATE);
    }

    retrieve(playerId: string | null): void {
        if (null == playerId) {
            this._navigator.goToErrorPage('Invalid player id');
            return;
        }

        forkJoin({
            player: this._playerService.retrieve(playerId),
            gameCount: this._playerService.countPlayedGames(playerId),
            trophyCount: this._playerService.countEarnedTrophies(playerId),
        }).subscribe({
            next: ({player, trophyCount, gameCount}) => this._state.update(s => ({
                ...s,
                player,
                gameCount,
                trophyCount
            })),
            error: () => this._navigator.goToErrorPage('Failed loading profile: ' + playerId),
        });
    }

    searchGames(playerId: string | null): void {
        if (null == playerId) {
            this._navigator.goToErrorPage('Invalid player id');
            return;
        }

        this._state.update(s => ({...s, games: {...s.games, loadingStatus: LoadingStatus.LOADING}}));
        this._playerService.searchGames(playerId, this._state().games.pageNumber, this._state().games.pageSize).subscribe({
            next: searchResult => {
                const games = [...this._state().games.results, ...searchResult.content] as PlayerGame[];
                const loadingStatus: LoadingStatus = games.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
                this._state.update(s => ({
                    ...s,
                    games: {...s.games, results: games, total: searchResult.total, loadingStatus}
                }));
            },
            error: () => {
                console.error(`Failed loading games for player ${playerId}`);
                this._state.update(s => ({...s, games: {...s.games, loadingStatus: LoadingStatus.ERROR}}));
            },
        });
    }

    loadMoreGames(playerId: string | null): void {
        this._state.update(s => ({...s, games: {...s.games, pageNumber: s.games.pageNumber + 1}}));
        this.searchGames(playerId);
    }

    searchTrophies(playerId: string | null): void {
        if (null == playerId) {
            this._navigator.goToErrorPage('Invalid player id');
            return;
        }

        this._state.update(s => ({...s, trophies: {...s.trophies, loadingStatus: LoadingStatus.LOADING}}));
        this._playerService.searchEarnedTrophies(playerId, this._state().trophies.pageNumber, this._state().trophies.pageSize).subscribe({
            next: searchResult => {
                const results = [...this._state().trophies.results, ...searchResult.content] as Trophy[];
                const loadingStatus: LoadingStatus = results.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
                this._state.update(s => ({
                    ...s,
                    trophies: {...s.trophies, results, total: searchResult.total, loadingStatus}
                }));
            },
            error: () => {
                console.error(`Failed loading trophies for player ${playerId}`);
                this._state.update(s => ({...s, trophies: {...s.trophies, loadingStatus: LoadingStatus.ERROR}}));
            },
        });
    }

    loadMoreTrophies(playerId: string | null): void {
        this._state.update(s => ({...s, trophies: {...s.trophies, pageNumber: s.trophies.pageNumber + 1}}));
        this.searchTrophies(playerId);
    }

}
