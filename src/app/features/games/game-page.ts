import {Component, HostListener, signal} from '@angular/core';
import {LoadingStatus} from '../../core/models/loading-status.enum';
import {GameStore} from '../../core/store/game-store';
import {GameList} from './game-list/game-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {GameCards} from './game-cards/game-cards';

@Component({
  selector: 'app-games',
  imports: [
    GameList,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    GameCards,
  ],
  templateUrl: './game-page.html',
  styleUrl: './game-page.scss',
})
export class GamePage {
  readonly viewMode = signal<'cards' | 'list'>('list');
  protected readonly LoadingStatus = LoadingStatus;

  constructor(public gameStore: GameStore) {
  }

  ngOnInit(): void {
    this.gameStore.searchGames();
  }

  setView(mode: 'cards' | 'list') {
    this.viewMode.set(mode);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.scrollHeight - 200;

    if (scrollPosition >= threshold && this.gameStore.loadingStatus() !== LoadingStatus.LOADING) {
      this.gameStore.loadNextPage();
    }
  }

}
