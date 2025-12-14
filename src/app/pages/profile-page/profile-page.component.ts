import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileStore} from '../../core/store/profile-store';
import {ProfileSummaryComponent} from '../../components/profile-summary/profile-summary.component';
import {ProfileCollectionCardComponent} from '../../components/profile-game-card/profile-collection-card.component';
import {ProfileTrophyCardComponent} from '../../components/profile-trophy-card/profile-trophy-card.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../core/services/utils/navigator.service";

@Component({
    selector: 'app-profile-page',
    imports: [
        ProfileSummaryComponent,
        ProfileCollectionCardComponent,
        ProfileTrophyCardComponent,
        MatProgressSpinnerModule,
    ],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
    playerId!: string | null;

    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _navigator: NavigatorService,
        public readonly profileStore: ProfileStore,
    ) {
    }

    ngOnInit(): void {
        this.playerId = this._route.snapshot.paramMap.get('playerId');
        this.profileStore.reset();
        this.profileStore.retrieve(this.playerId);
        this.profileStore.searchCollections(this.playerId);
        this.profileStore.searchTrophies(this.playerId);
    }

    navigateToPlayerCollectionPage(collectionId: string): void {
        if (this.playerId === null) {
            console.error('Player ID is null');
        } else {
            this._navigator.goToPlayerCollectionPage(collectionId, this.playerId);
        }
    }

    loadMoreGames(): void {
        this.profileStore.loadMoreCollections(this.playerId);
    }

    loadMoreTrophies(): void {
        this.profileStore.loadMoreTrophies(this.playerId);
    }

}
