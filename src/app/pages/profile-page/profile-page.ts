import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileStore} from '../../core/store/profile-store';
import {ProfileSummary} from '../../components/profile-summary/profile-summary';
import {ProfileGameList} from '../../components/profile-game-list/profile-game-list';
import {ProfileTrophyList} from '../../components/profile-trophy-list/profile-trophy-list';
import {UserGame} from '../../core/models/dto/user-game';

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

  navigateToGamePage(game: UserGame) {
    const gameId = game.id;
    this._router.navigate(['/game', gameId]).then(() => console.info(`Navigated to game page: ${gameId}`));
  }

  ngOnInit(): void {
    this.userProfileId = this._route.snapshot.paramMap.get('userProfileId');
    this.profileStore.fetch(this.userProfileId);
  }
}
