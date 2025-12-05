import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ObtainedTrophy} from '../../core/models/dto/obtained-trophy';
import {DatePipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-home-obtained-trophy-card',
  imports: [
    NgOptimizedImage,
    DatePipe
  ],
  templateUrl: './home-obtained-trophy-card.html',
  styleUrl: './home-obtained-trophy-card.scss',
})
export class HomeObtainedTrophyCard {
  @Input({required: true}) trophy!: ObtainedTrophy;
  @Output() clickOnPlayer = new EventEmitter();
}
