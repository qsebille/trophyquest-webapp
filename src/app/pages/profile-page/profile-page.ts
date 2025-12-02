import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileStore} from '../../core/store/profile-store';
import {ProfileSummary} from '../../components/profile-summary/profile-summary';
import {ProfileGameList} from '../../components/profile-game-list/profile-game-list';
import {ProfileTrophyList} from '../../components/profile-trophy-list/profile-trophy-list';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileSummary,
    ProfileGameList,
    ProfileTrophyList
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

  navigateToGamePage(event: { gameId: string, collectionId: string }) {
    this._router.navigate(['/game', event.gameId], {
      queryParams: {
        collectionId: event.collectionId,
        userId: this.userProfileId
      }
    })
      .then(() => console.info(`Navigated to game page: ${event.gameId}, collection ${event.collectionId}, user ${this.userProfileId}`));
  }

  ngOnInit(): void {
    this.userProfileId = this._route.snapshot.paramMap.get('userProfileId');
    this.profileStore.fetch(this.userProfileId);
  }
}
