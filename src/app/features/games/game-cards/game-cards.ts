import {Component, Input} from '@angular/core';
import {MatCard, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {Game} from '../../../core/models/dto/game';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-game-cards',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    MatButtonToggleModule
  ],
  templateUrl: './game-cards.html',
  styleUrl: './game-cards.scss',
})
export class GameCards {
  @Input({required: true}) gameList: Game[] = [];

  getGamePlatforms(game: Game): string {
    if (!game?.trophySets?.length) {
      return '';
    }
    const platforms = game.trophySets.map(s => s.platform);
    return Array.from(new Set(platforms)).sort().join(' · ');
  }
}
