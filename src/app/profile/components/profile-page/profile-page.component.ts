import {Component, computed, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileSummaryComponent} from '../profile-summary/profile-summary.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../../core/services/navigator.service";
import {ProfileSummaryStore} from "../../stores/profile-summary-store.service";
import {ProfileTrophiesStore} from "../../stores/profile-trophies-store.service";
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {ProfileTrophyListComponent} from "../profile-trophy-list/profile-trophy-list.component";
import {ProfileTrophySetListStore} from "../../stores/profile-trophy-set-list-store.service";
import {ProfileTrophySetListComponent} from "../profile-trophy-set-list/profile-trophy-set-list.component";

@Component({
    selector: 'tq-profile-page',
    imports: [
        ProfileSummaryComponent,
        MatProgressSpinnerModule,
        ErrorMessageComponent,
        ProfileTrophyListComponent,
        ProfileTrophySetListComponent,
    ],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
    playerId!: string | null;

    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _navigator: NavigatorService,
        private readonly _profileSummaryStore: ProfileSummaryStore,
        private readonly _profileTrophySetListStore: ProfileTrophySetListStore,
        private readonly _profileTrophiesStore: ProfileTrophiesStore,
    ) {
    }

    readonly player = computed(() => this._profileSummaryStore.player());
    readonly playerStats = computed(() => this._profileSummaryStore.playerStats());
    readonly summaryStatus = computed(() => this._profileSummaryStore.status());

    readonly trophySets = computed(() => this._profileTrophySetListStore.trophySets());
    readonly trophySetListStatus = computed(() => this._profileTrophySetListStore.status());

    readonly trophies = computed(() => this._profileTrophiesStore.trophies());
    readonly trophiesStatus = computed(() => this._profileTrophiesStore.status());

    readonly hasFailedLoading = computed(() => this._profileSummaryStore.status() === LoadingStatus.ERROR);

    ngOnInit(): void {
        this.playerId = this._route.snapshot.paramMap.get('playerId');
        this.loadProfileData();
    }

    loadProfileData(): void {
        this._profileSummaryStore.reset();
        this._profileSummaryStore.retrieve(this.playerId);
        this._profileTrophySetListStore.reset();
        this._profileTrophySetListStore.search(this.playerId);
        this._profileTrophiesStore.reset();
        this._profileTrophiesStore.search(this.playerId);
    }

    navigateToPlayerTrophySetPage(trophySetId: string): void {
        if (this.playerId === null) {
            console.error('Player ID is null');
        } else {
            this._navigator.goToPlayerTrophySetPage(trophySetId, this.playerId);
        }
    }

    loadMoreGames(): void {
        this._profileTrophySetListStore.loadMore(this.playerId);
    }

    loadMoreTrophies(): void {
        this._profileTrophiesStore.loadMore(this.playerId);
    }
}
