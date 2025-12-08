import {Component, Input} from '@angular/core';
import {Game} from '../../core/models/dto/game';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-game-summary',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './game-summary.html',
  styleUrl: './game-summary.scss',
})
export class GameSummary {
  @Input({required: true}) game!: Game;
}
