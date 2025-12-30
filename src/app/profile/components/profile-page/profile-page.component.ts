import {Component, computed} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileSummaryComponent} from '../profile-summary/profile-summary.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../../core/services/navigator.service";
import {ProfileSummaryStore} from "../../stores/profile-summary-store.service";
import {getTotalTrophies} from "../../../core/models/dto/trophy-count-per-type";
import {ProfileGamesStore} from "../../stores/profile-games-store.service";
import {ProfileTrophiesStore} from "../../stores/profile-trophies-store.service";
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {ProfileGameListComponent} from "../profile-game-list/profile-game-list.component";
import {ProfileTrophyListComponent} from "../profile-trophy-list/profile-trophy-list.component";

@Component({
    selector: 'tq-profile-page',
    imports: [
        ProfileSummaryComponent,
        MatProgressSpinnerModule,
        ErrorMessageComponent,
        ProfileGameListComponent,
        ProfileTrophyListComponent,
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

    readonly playerSummary = computed(() => this._profileSummaryStore.player());
    readonly totalPlayedGames = computed(() => this._profileSummaryStore.totalGames());
    readonly trophyCountPerType = computed(() => this._profileSummaryStore.trophyCountPerType());
    readonly totalEarnedTrophies = computed(() => getTotalTrophies(this.trophyCountPerType()));
    readonly summaryStatus = computed(() => this._profileSummaryStore.status());

    readonly games = computed(() => this._profileGamesStore.games());
    readonly gamesStatus = computed(() => this._profileGamesStore.status())

    readonly trophies = computed(() => this._profileTrophiesStore.trophies());
    readonly trophiesStatus = computed(() => this._profileTrophiesStore.status());

    readonly hasFailedLoading = computed(() => {
        return [
            this._profileSummaryStore.status(),
            this._profileGamesStore.status(),
            this._profileTrophiesStore.status(),
        ].some(status => status === LoadingStatus.ERROR);
    });

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
