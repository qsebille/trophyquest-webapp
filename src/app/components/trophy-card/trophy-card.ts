import {Component, Input} from '@angular/core';
import {Trophy} from '../../core/models/dto/trophy';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-trophy-card',
  imports: [
    MatCardModule,
    MatIconModule,
    NgOptimizedImage,
    DatePipe,
  ],
  templateUrl: './trophy-card.html',
  styleUrl: './trophy-card.scss',
})
export class TrophyCard {
  @Input({required: true}) trophy: Trophy | undefined
  @Input({required: false}) imageSize: number = 50
  @Input({required: false}) showHiddenTrophies: boolean = false

  get isTrophyHidden(): boolean {
    return !this.showHiddenTrophies && (this.trophy?.isHidden ?? false) && this.trophy?.earnedDate === null;
  }
}
