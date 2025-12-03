import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserGame} from '../../core/models/dto/user-game';
import {NgOptimizedImage} from '@angular/common';
import {TrophyCountDisplayer} from '../trophy-count-displayer/trophy-count-displayer';

@Component({
  selector: 'app-profile-game-card',
  imports: [
    NgOptimizedImage,
    TrophyCountDisplayer
  ],
  templateUrl: './profile-game-card.html',
  styleUrl: './profile-game-card.scss',
})
export class ProfileGameCard {
  @Input({required: true}) game!: UserGame;
  @Output() public readonly gameClicked = new EventEmitter<{ gameId: string, collectionId: string }>();

  isExpanded: boolean = false;

  get isCompleted(): boolean {
    return this.game.earnedTrophies.platinum === this.game.totalTrophies.platinum &&
      this.game.earnedTrophies.gold === this.game.totalTrophies.gold &&
      this.game.earnedTrophies.silver === this.game.totalTrophies.silver &&
      this.game.earnedTrophies.bronze === this.game.totalTrophies.bronze;
  }

  clickOnGameCard(): void {
    if (this.game.trophyCollections.length === 1) {
      this.gameClicked.emit({gameId: this.game.id, collectionId: this.game.trophyCollections[0].id});
    } else {
      this.isExpanded = !this.isExpanded;
    }
  }

  clickOnCollection(collectionId: string): void {
    this.gameClicked.emit({gameId: this.game.id, collectionId});
  }

}
