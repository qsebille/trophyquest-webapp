import {Component, computed} from '@angular/core';
import {HomeGameCardComponent} from '../../components/home-game-card/home-game-card.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HomeSummaryComponent} from '../../components/home-summary/home-summary.component';
import {NavigatorService} from "../../core/services/utils/navigator.service";
import {HomeSummaryStoreService} from "../../core/store/home/home-summary-store.service";
import {HomeRecentPlayerStoreService} from "../../core/store/home/home-recent-player-store.service";
import {SectionListComponent} from "../../components/section-list/section-list.component";
import {SectionListContentTemplate, SectionListHeaderTemplate} from "../../templates/section-list.template";
import {HomeTrophyCardComponent} from "../../components/home-trophy-card/home-trophy-card.component";
import {ErrorMessageComponent} from "../../components/utils/error-message/error-message.component";
import {HomePopularGamesStore} from "../../core/store/home/home-popular-games-store.service";
import {TrophyquestBlockComponent} from "../../components/trophyquest-block/trophyquest-block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../templates/block.template";
import {HomePlayerCardComponent} from "../../components/home-player-card/home-player-card.component";


@Component({
    selector: 'app-home-page',
    imports: [
        HomeGameCardComponent,
        MatProgressSpinnerModule,
        HomeSummaryComponent,
        SectionListComponent,
        SectionListHeaderTemplate,
        SectionListContentTemplate,
        HomeTrophyCardComponent,
        ErrorMessageComponent,
        TrophyquestBlockComponent,
        BlockHeaderTemplate,
        BlockContentTemplate,
        HomePlayerCardComponent,
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
    readonly isLoadingSummary = computed(() => this._homeSummaryStore.isLoading());
    readonly hasFailedLoadingSummary = computed(() => this._homeSummaryStore.isError());

    readonly popularGames = computed(() => this._homeGameStore.games())
    readonly isLoadingGames = computed(() => this._homeGameStore.isLoading());
    readonly hasFailedLoadingGames = computed(() => this._homeGameStore.isError());
    readonly hasNoPopularGames = computed(() => this._homeGameStore.games().length == 0 && !this.isLoadingGames() && !this.hasFailedLoadingGames());

    readonly recentPlayers = computed(() => this._homeRecentPlayerStore.list());
    readonly isLoadingPlayers = computed(() => this._homeRecentPlayerStore.isLoading());
    readonly hasFailedLoadingPlayers = computed(() => this._homeRecentPlayerStore.isError())
    readonly hasNoRecentPlayers = computed(() => this._homeRecentPlayerStore.list().length == 0 && !this.isLoadingPlayers() && !this.hasFailedLoadingPlayers());

    ngOnInit(): void {
        this._homeSummaryStore.fetch();
        this._homeRecentPlayerStore.fetch();
        this._homeGameStore.fetch();
    }

    navigateToProfilePage(playerId: string): void {
        this._navigator.goToProfilePage(playerId);
    }

    navigateToGamePage(gameId: string): void {
        this._navigator.goToGamePage(gameId);
    }
}
