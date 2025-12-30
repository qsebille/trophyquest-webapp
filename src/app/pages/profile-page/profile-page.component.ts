import {Component, computed} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileSummaryComponent} from '../../components/profile-summary/profile-summary.component';
import {ProfileTrophyCardComponent} from '../../components/profile-trophy-card/profile-trophy-card.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../core/services/navigator.service";
import {ProfileGameCardComponent} from "../../components/profile-game-card/profile-game-card.component";
import {ProfileSummaryStore} from "../../core/store/profile/profile-summary-store.service";
import {getTotalTrophies} from "../../core/models/dto/trophy-count-per-type";
import {ProfileGamesStore} from "../../core/store/profile/profile-games-store.service";
import {ProfileTrophiesStore} from "../../core/store/profile/profile-trophies-store.service";
import {ErrorMessageComponent} from "../../core/components/error-message/error-message.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../core/templates/block.template";
import {BlockComponent} from "../../core/components/trophyquest-block/block.component";

@Component({
    selector: 'tq-profile-page',
    imports: [
        ProfileSummaryComponent,
        ProfileTrophyCardComponent,
        MatProgressSpinnerModule,
        ProfileGameCardComponent,
        ErrorMessageComponent,
        BlockContentTemplate,
        BlockHeaderTemplate,
        BlockComponent,
    ],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
    playerId!: string | null;

    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _navigator: NavigatorService,
        private readonly _profileSummaryStore: ProfileSummaryStore,
        private readonly _profileGamesStore: ProfileGamesStore,
        private readonly _profileTrophiesStore: ProfileTrophiesStore,
    ) {
    }

    readonly player = computed(() => this._profileSummaryStore.player());
    readonly games = computed(() => this._profileGamesStore.games());
    readonly hasMoreGames = computed(() => this._profileGamesStore.isPartiallyLoaded());
    readonly trophies = computed(() => this._profileTrophiesStore.trophies());
    readonly hasMoreTrophies = computed(() => this._profileTrophiesStore.isPartiallyLoaded());
    readonly totalPlayedGames = computed(() => this._profileSummaryStore.gameCount());
    readonly trophyCountPerType = computed(() => this._profileSummaryStore.trophyCountPerType());
    readonly totalEarnedTrophies = computed(() => getTotalTrophies(this.trophyCountPerType()));

    readonly isLoadingSummary = computed(() => this._profileSummaryStore.isLoading());
    readonly isLoadingGames = computed(() => this._profileGamesStore.isLoading());
    readonly isLoadingTrophies = computed(() => this._profileTrophiesStore.isLoading());
    readonly hasFailedLoading = computed(() => this._profileSummaryStore.isError() || this._profileGamesStore.isError() || this._profileTrophiesStore.isError());

    readonly displayLoadMoreGamesButton = computed(() => this.hasMoreGames() && !this.isLoadingGames());
    readonly displayLoadMoreTrophiesButton = computed(() => this.hasMoreTrophies() && !this.isLoadingTrophies());

    ngOnInit(): void {
        this.playerId = this._route.snapshot.paramMap.get('playerId');
        this.loadProfileData();
    }

    loadProfileData(): void {
        this._profileSummaryStore.reset();
        this._profileSummaryStore.retrieve(this.playerId);
        this._profileGamesStore.reset();
        this._profileGamesStore.searchGames(this.playerId);
        this._profileTrophiesStore.reset();
        this._profileTrophiesStore.searchTrophies(this.playerId);
    }

    navigateToPlayerGamePage(gameId: string): void {
        if (this.playerId === null) {
            console.error('Player ID is null');
        } else {
            this._navigator.goToPlayerGamePage(gameId, this.playerId);
        }
    }

    loadMoreGames(): void {
        this._profileGamesStore.loadMoreGames(this.playerId);
    }

    loadMoreTrophies(): void {
        this._profileTrophiesStore.loadMoreTrophies(this.playerId);
    }

}
