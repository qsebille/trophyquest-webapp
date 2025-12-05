import {Component} from '@angular/core';
import {GameListStore} from '../../core/store/game-list-store';
import {HomeGameCard} from '../../components/home-game-card/home-game-card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LastObtainedTrophiesStore} from '../../core/store/last-obtained-trophies-store';
import {HomeObtainedTrophyCard} from '../../components/home-obtained-trophy-card/home-obtained-trophy-card';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [
    HomeGameCard,
    HomeObtainedTrophyCard,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  constructor(
    private readonly _router: Router,
    public readonly gameListStore: GameListStore,
    public readonly lastObtainedTrophyStore: LastObtainedTrophiesStore,
  ) {
  }

  ngOnInit(): void {
    this.gameListStore.resetState();
    this.gameListStore.search();
    this.lastObtainedTrophyStore.resetState();
    this.lastObtainedTrophyStore.search();
  }

  loadMoreGames(): void {
    this.gameListStore.loadMore();
  }

  loadMoreTrophies(): void {
    this.lastObtainedTrophyStore.loadMore();
  }

  goToProfilePage(playerId: string): void {
    this._router.navigate(['/profile', playerId]).then(() => console.info(`Navigated to profile page: ${playerId}`));
  }

}
