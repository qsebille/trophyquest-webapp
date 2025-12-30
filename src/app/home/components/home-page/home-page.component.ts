import {Component, computed} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../../core/services/navigator.service";
import {HomeSummaryStoreService} from "../../stores/home-summary-store.service";
import {HomeRecentPlayerStoreService} from "../../stores/home-recent-player-store.service";
import {HomePopularGamesStore} from "../../stores/home-popular-games-store.service";
import {HomeSummaryComponent} from "../home-summary/home-summary.component";
import {HomeGameListComponent} from "../home-game-list/home-game-list.component";
import {HomePlayerListComponent} from "../home-player-list/home-player-list.component";


@Component({
    selector: 'app-home-page',
    imports: [
        MatProgressSpinnerModule,
        HomeSummaryComponent,
        HomeGameListComponent,
        HomePlayerListComponent,
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
    constructor(
        private readonly _homeSummaryStore: HomeSummaryStoreService,
        private readonly _homeRecentPlayerStore: HomeRecentPlayerStoreService,
        private readonly _homeGameStore: HomePopularGamesStore,
        private readonly _navigator: NavigatorService,
    ) {
    }

    readonly totalGames = computed(() => this._homeSummaryStore.nbGames());
    readonly totalPlayers = computed(() => this._homeSummaryStore.nbPlayers());
    readonly totalEarnedTrophies = computed(() => this._homeSummaryStore.nbEarnedTrophies());
    readonly summaryStatus = computed(() => this._homeSummaryStore.status());

    readonly games = computed(() => this._homeGameStore.games())
    readonly gamesStatus = computed(() => this._homeGameStore.status());

    readonly players = computed(() => this._homeRecentPlayerStore.players());
    readonly playersStatus = computed(() => this._homeRecentPlayerStore.status());

    ngOnInit(): void {
        this._homeSummaryStore.fetch();
        this._homeRecentPlayerStore.fetch();
        this._homeGameStore.fetch();
    }

    navigateToPlayersPage(): void {
        this._navigator.goToPlayersPage();
    }

    navigateToProfilePage(playerId: string): void {
        this._navigator.goToProfilePage(playerId);
    }

    navigateToGamePage(gameId: string): void {
        this._navigator.goToGamePage(gameId);
    }

    navigateToPlayerGamePage(
        gameId: string,
        playerId: string
    ): void {
        this._navigator.goToPlayerGamePage(gameId, playerId);
    }
}
