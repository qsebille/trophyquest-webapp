import {Component} from '@angular/core';
import {MatCard, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {LoadingStatus} from '../../core/models/loading-status.enum';
import {GameStore} from '../../core/store/game-store';
import {Game} from '../../core/models/dto/game';

@Component({
  selector: 'app-games',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatCardImage,
    MatCardTitle
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent {
  protected readonly LoadingStatus = LoadingStatus;

  constructor(public gameStore: GameStore) {
  }

  ngOnInit(): void {
    this.gameStore.searchGames();
  }

  getGamePlatforms(game: Game): string {
    if (!game?.trophySets?.length) {
      return '';
    }
    const platforms = game.trophySets.map(s => s.platform);
    return Array.from(new Set(platforms)).sort().join(' · ');
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const distanceFromBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
    const threshold = 150;

    if (distanceFromBottom < threshold && this.gameStore.loadingStatus() !== LoadingStatus.LOADING) {
      this.loadMoreGames();
    }
  }

  loadMoreGames(): void {
    console.info("Loading games...");
    this.gameStore.loadNextPage();
  }

}
