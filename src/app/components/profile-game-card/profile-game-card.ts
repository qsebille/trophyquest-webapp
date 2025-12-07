import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TrophyCountDisplayer} from '../trophy-count-displayer/trophy-count-displayer';
import {PlayerCollection} from '../../core/models/dto/player-collection';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-profile-game-card',
  imports: [
    TrophyCountDisplayer,
    MatProgressBarModule,
    DecimalPipe,
  ],
  templateUrl: './profile-game-card.html',
  styleUrl: './profile-game-card.scss',
})
export class ProfileGameCard {
  @Input({required: true}) collection!: PlayerCollection;
  @Output() public readonly clickOnTitle = new EventEmitter();

  get completionScore(): number {
    const earnedTrophies: number = this.collection.earnedTrophies.platinum +
      this.collection.earnedTrophies.gold +
      this.collection.earnedTrophies.silver +
      this.collection.earnedTrophies.bronze;
    const totalTrophies: number = this.collection.collectionTrophies.platinum +
      this.collection.collectionTrophies.gold +
      this.collection.collectionTrophies.silver +
      this.collection.collectionTrophies.bronze;

    return earnedTrophies / totalTrophies * 100;
  }

  get isCompleted(): boolean {
    return this.completionScore === 100;
  }

}
