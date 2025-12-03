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

  get isPS4(): boolean {
    return this._platforms.some(p => p === 'PS4') ?? false;
  }

  get isPS5(): boolean {
    return this._platforms.some(p => p === 'PS5') ?? false;
  }

  private get _platforms(): string[] {
    return this.game?.platforms ?? [];
  }
}
