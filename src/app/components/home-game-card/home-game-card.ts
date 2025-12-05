import {Component, Input} from '@angular/core';
import {Game} from '../../core/models/dto/game';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-home-game-card',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './home-game-card.html',
  styleUrl: './home-game-card.scss',
})
export class HomeGameCard {
  @Input({required: true}) game: Game | undefined;
}
