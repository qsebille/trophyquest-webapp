import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileStore} from '../../core/store/profile-store';
import {ProfileSummary} from '../../components/profile-summary/profile-summary';
import {ProfileGameCard} from '../../components/profile-game-card/profile-game-card';
import {ProfileTrophyCard} from '../../components/profile-trophy-card/profile-trophy-card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileSummary,
    ProfileGameCard,
    ProfileTrophyCard,
    MatProgressSpinnerModule,
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  userProfileId!: string | null;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    public readonly profileStore: ProfileStore,
  ) {
  }

  ngOnInit(): void {
    this.userProfileId = this._route.snapshot.paramMap.get('userProfileId');
    this.profileStore.reset();
    this.profileStore.fetch(this.userProfileId);
    this.profileStore.searchGames(this.userProfileId);
    this.profileStore.searchTrophies(this.userProfileId);
  }

  navigateToGamePage(event: { gameId: string, collectionId: string }): void {
    this._router.navigate(['/game', event.gameId], {
      queryParams: {
        collectionId: event.collectionId,
        userId: this.userProfileId
      }
    })
      .then(() => console.info(`Navigated to game page: ${event.gameId}, collection ${event.collectionId}, user ${this.userProfileId}`));
  }

  loadMoreGames(): void {
    this.profileStore.loadMoreGames(this.userProfileId);
  }

  loadMoreTrophies(): void {
    this.profileStore.loadMoreTrophies(this.userProfileId);
  }

}
