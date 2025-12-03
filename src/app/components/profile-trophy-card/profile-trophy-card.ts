import {Component, Input} from '@angular/core';
import {Trophy} from '../../core/models/dto/trophy';
import {DatePipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-profile-trophy-card',
  imports: [
    DatePipe,
    NgOptimizedImage
  ],
  templateUrl: './profile-trophy-card.html',
  styleUrl: './profile-trophy-card.scss',
})
export class ProfileTrophyCard {
  @Input({required: true}) trophy!: Trophy;

  isExpanded: boolean = false;

  toggleExpansion(): void {
    this.isExpanded = !this.isExpanded;
  }

}
