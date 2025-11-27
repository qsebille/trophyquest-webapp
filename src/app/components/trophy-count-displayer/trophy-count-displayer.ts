import {Component, Input} from '@angular/core';
import {TrophyCount} from '../../core/models/dto/trophy-count';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-trophy-count-displayer',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './trophy-count-displayer.html',
  styleUrl: './trophy-count-displayer.scss',
})
export class TrophyCountDisplayer {
  @Input({required: true}) trophyCount: TrophyCount = {platinum: 0, gold: 0, silver: 0, bronze: 0};
  @Input({required: false}) iconSize: number = 50;
  @Input({required: false}) textSizePx: number = 20;
  @Input({required: false}) labelOrientation: 'horizontal' | 'vertical' = 'horizontal';

  computeFlexDirection(): string {
    return this.labelOrientation === 'horizontal' ? 'row' : 'column';
  }
}
