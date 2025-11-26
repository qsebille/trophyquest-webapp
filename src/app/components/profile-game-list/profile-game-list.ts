import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Output() public readonly gameClicked = new EventEmitter<UserGame>();

  readonly gameIconSize: number = 64
  readonly trophyIconSize: number = 32
  private readonly expandedGameIds: Set<string> = new Set<string>();

  /**
   * Handles the click event on a game card. Depending on the game's trophy collections,
   * it either toggles the display of the game's details or navigates to the game detail page.
   *
   * @param {UserGame} game - The game object associated with the clicked game card.
   * @return {void} This method does not return a value.
   */
  handleClickOnGameCard(game: UserGame): void {
    console.info(`Clicked on game card: ${game.title}`);
    if (game.trophyCollections.length > 1) {
      this.toggle(game.id);
    } else {
      this.gameClicked.emit(game);
    }
  }

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

  isUserGameComplete(userGame: UserGame): boolean {
    return userGame.earnedTrophies.platinum === userGame.totalTrophies.platinum &&
      userGame.earnedTrophies.gold === userGame.totalTrophies.gold &&
      userGame.earnedTrophies.silver === userGame.totalTrophies.silver &&
      userGame.earnedTrophies.bronze === userGame.totalTrophies.bronze;
  }
}
