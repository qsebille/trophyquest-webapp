import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {UserGame} from '../../core/models/dto/user-game';

@Component({
  selector: 'app-profile-game-list',
  imports: [
    MatCardModule,
    NgOptimizedImage
  ],
  templateUrl: './profile-game-list.html',
  styleUrl: './profile-game-list.scss',
})
export class ProfileGameList {
  @Input({required: true}) gameList: UserGame[] = [];

  readonly gameIconSize: number = 64
  readonly trophyIconSize: number = 32
  private readonly expandedGameIds: Set<string> = new Set<string>();

  toggle(gameId: string): void {
    if (this.expandedGameIds.has(gameId)) {
      this.expandedGameIds.delete(gameId);
      return;
    }

    this.expandedGameIds.add(gameId);
  }

  isExpanded(gameId: string): boolean {
    return this.expandedGameIds.has(gameId);
  }

  getToggleAriaLabel(game: UserGame): string {
    return `${this.isExpanded(game.id) ? 'Réduire' : 'Développer'} ${game.title}`;
  }

  isUserGameComplete(userGame: UserGame): boolean {
    return userGame.earnedTrophies.platinum === userGame.totalTrophies.platinum &&
      userGame.earnedTrophies.gold === userGame.totalTrophies.gold &&
      userGame.earnedTrophies.silver === userGame.totalTrophies.silver &&
      userGame.earnedTrophies.bronze === userGame.totalTrophies.bronze;
  }
}
