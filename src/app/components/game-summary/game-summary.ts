import {Component, Input} from '@angular/core';
import {Game} from '../../core/models/dto/game';

@Component({
  selector: 'app-game-summary',
  imports: [],
  templateUrl: './game-summary.html',
  styleUrl: './game-summary.scss',
})
export class GameSummary {
  @Input({required: true}) game: Game | undefined;
}
