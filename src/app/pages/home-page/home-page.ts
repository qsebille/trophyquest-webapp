import {Component} from '@angular/core';
import {GameListStore} from '../../core/store/game-list-store';
import {HomeGameCard} from '../../components/home-game-card/home-game-card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home-page',
  imports: [
    HomeGameCard,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  constructor(public readonly gameListStore: GameListStore) {
  }

  ngOnInit(): void {
    this.gameListStore.resetState();
    this.gameListStore.search();
  }

  loadMoreGames(): void {
    this.gameListStore.loadMore();
  }

}
