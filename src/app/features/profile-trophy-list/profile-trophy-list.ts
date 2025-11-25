import {Component, Input} from '@angular/core';
import {EarnedTrophy} from '../../core/models/dto/earned-trophy';
import {MatCardModule} from '@angular/material/card';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-profile-trophy-list',
  imports: [
    MatCardModule,
    MatIconModule,
    NgOptimizedImage,
    DatePipe,
  ],
  templateUrl: './profile-trophy-list.html',
  styleUrl: './profile-trophy-list.scss',
})
export class ProfileTrophyList {
  @Input({required: true}) trophyList: EarnedTrophy[] = [];
  readonly iconSize: number = 50
  readonly trophyTypeSize: number = 50
}
