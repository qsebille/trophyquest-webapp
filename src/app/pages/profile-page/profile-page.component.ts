import {Component, computed} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileStore} from '../../core/store/profile-store';
import {ProfileSummaryComponent} from '../../components/profile-summary/profile-summary.component';
import {ProfileTrophyCardComponent} from '../../components/profile-trophy-card/profile-trophy-card.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../core/services/utils/navigator.service";
import {ProfileGameCardComponent} from "../../components/profile-game-card/profile-game-card.component";

@Component({
    selector: 'app-profile-page',
    imports: [
        ProfileSummaryComponent,
        ProfileTrophyCardComponent,
        MatProgressSpinnerModule,
        ProfileGameCardComponent,
    ],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
    playerId!: string | null;

    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _navigator: NavigatorService,
        private readonly _profileStore: ProfileStore,
    ) {
    }

    // todo: faire plusieurs stores et revoir la logique de display dans le template
    readonly player = computed(() => this._profileStore.player());
    readonly totalEarnedTrophies = computed(() => this._profileStore.totalEarnedTrophies());
    readonly totalPlayedGames = computed(() => this._profileStore.totalPlayedGames());
    readonly trophyCount = computed(() => this._profileStore.trophyCount());

    readonly games = computed(() => this._profileStore.games());
    readonly hasMoreGames = computed(() => this._profileStore.hasMoreGames());
    readonly isLoadingGames = computed(() => this._profileStore.isLoadingGames());
    readonly hasNoGames = computed(() => this._profileStore.hasNoGames());
    readonly hasErrorLoadingGames = computed(() => this._profileStore.hasErrorLoadingGames());

    readonly trophies = computed(() => this._profileStore.trophies());
    readonly hasMoreTrophies = computed(() => this._profileStore.hasMoreTrophies());
    readonly isLoadingTrophies = computed(() => this._profileStore.isLoadingTrophies());
    readonly hasNoTrophies = computed(() => this._profileStore.hasNoTrophies());
    readonly hasErrorLoadingTrophies = computed(() => this._profileStore.hasErrorLoadingTrophies());

    ngOnInit(): void {
        this.playerId = this._route.snapshot.paramMap.get('playerId');
        this._profileStore.reset();
        this._profileStore.retrieve(this.playerId);
        this._profileStore.searchGames(this.playerId);
        this._profileStore.searchTrophies(this.playerId);
    }

    navigateToPlayerGamePage(gameId: string): void {
        if (this.playerId === null) {
            console.error('Player ID is null');
        } else {
            this._navigator.goToPlayerGamePage(gameId, this.playerId);
        }
    }

    loadMoreGames(): void {
        this._profileStore.loadMoreGames(this.playerId);
    }

    loadMoreTrophies(): void {
        this._profileStore.loadMoreTrophies(this.playerId);
    }

}
