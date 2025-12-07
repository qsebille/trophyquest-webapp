import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileStore} from '../../core/store/profile-store';
import {ProfileSummary} from '../../components/profile-summary/profile-summary';
import {ProfileGameCard} from '../../components/profile-game-card/profile-game-card';
import {ProfileTrophyCard} from '../../components/profile-trophy-card/profile-trophy-card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {PlayerCollection} from '../../core/models/dto/player-collection';

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
  playerId!: string | null;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
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

  navigateToGamePage(playerCollection: PlayerCollection): void {
    this._router.navigate(['/game', playerCollection.gameId], {
      queryParams: {
        collectionId: playerCollection.collectionId,
        playerId: this.playerId
      }
    })
      .then(() => console.info(`Navigated to game page: ${playerCollection.gameId}, collection ${playerCollection.collectionId}, player ${this.playerId}`));
  }

  loadMoreGames(): void {
    this.profileStore.loadMoreCollections(this.playerId);
  }

  loadMoreTrophies(): void {
    this.profileStore.loadMoreTrophies(this.playerId);
  }

}
