import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {TrophyCountDisplayer} from '../trophy-count-displayer/trophy-count-displayer';
import {PlayerSummary} from '../../core/models/dto/player-summary';
import {Player} from '../../core/models/dto/player';
import {TrophyCount} from '../../core/models/dto/trophy-count';

@Component({
  selector: 'app-player-card',
  imports: [
    NgOptimizedImage,
    TrophyCountDisplayer
  ],
  templateUrl: './player-card.html',
  styleUrl: './player-card.scss',
})
export class PlayerCard {
  @Input({required: true}) playerSummary!: PlayerSummary;
  @Output() clickOnPseudo: EventEmitter<any> = new EventEmitter();
  @Output() clickOnGame: EventEmitter<any> = new EventEmitter();

  get player(): Player {
    return this.playerSummary.player;
  }

  get trophyCount(): TrophyCount {
    return this.playerSummary.trophyCount;
  }

  get totalPlayedGames(): number {
    return this.playerSummary.totalGamesPlayed;
  }

  get lastGamePlayedTitle(): string {
    return this.playerSummary.lastPlayedGameTitle;
  }

  get lastGamePlayedImageUrl(): string {
    return this.playerSummary.lastPlayedGameImageUrl;
  }

}
