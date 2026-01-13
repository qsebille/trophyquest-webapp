import {Component, computed, OnInit} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../../core/services/navigator.service";
import {HomePlayerListComponent} from "../home-player-list/home-player-list.component";
import {HomeStatsStore} from "../../stores/home-stats-store.service";
import {HomeStats} from "../../../core/models/dto/home-stats";
import {HomeStatsComponent} from "../home-stats/home-stats.component";
import {HomeRecentPlayersStore} from "../../stores/home-recent-players-store.service";
import {HomeRecentTrophySetsStore} from "../../stores/home-recent-trophy-sets-store.service";
import {HomeTrophySetListComponent} from "../home-trophy-set-list/home-trophy-set-list.component";


@Component({
    selector: 'tq-home-page',
    imports: [
        MatProgressSpinnerModule,
        HomeTrophySetListComponent,
        HomePlayerListComponent,
        HomeStatsComponent,
        HomeStatsComponent,
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
    constructor(
        private readonly _statsStore: HomeStatsStore,
        private readonly _recentPlayersStore: HomeRecentPlayersStore,
        private readonly _recentTrophySetsStore: HomeRecentTrophySetsStore,
        private readonly _navigator: NavigatorService,
    ) {
    }

    readonly stats = computed(() =>
        ({
            totalPlayers: this._statsStore.playerCount(),
            totalTrophySets: this._statsStore.trophySetCount(),
            totalTrophies: this._statsStore.trophyCount(),
            recentPlayers: this._statsStore.recentPlayerCount(),
            recentTrophySets: this._statsStore.recentTrophySetCount(),
            recentTrophies: this._statsStore.recentTrophyCount(),
        } as HomeStats));
    readonly statsLoadingStatus = computed(() => this._statsStore.status());

    readonly trophySets = computed(() => this._recentTrophySetsStore.trophySets());
    readonly trophySetsStatus = computed(() => this._recentTrophySetsStore.status());

    readonly players = computed(() => this._recentPlayersStore.players());
    readonly playersStatus = computed(() => this._recentPlayersStore.status());

    ngOnInit(): void {
        this._statsStore.retrieve();
        this._recentPlayersStore.fetch();
        this._recentTrophySetsStore.fetch();
    }

    navigateToPlayersPage(): void {
        this._navigator.goToPlayersPage();
    }

    navigateToProfilePage(playerId: string): void {
        this._navigator.goToProfilePage(playerId);
    }

    navigateToTrophySetPage(trophySetId: string): void {
        this._navigator.goToTrophySetPage(trophySetId);
    }

    navigateToPlayerTrophySetPage(
        trophySetId: string,
        playerId: string
    ): void {
        this._navigator.goToPlayerTrophySetPage(trophySetId, playerId);
    }
}
