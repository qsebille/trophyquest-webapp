import {Component, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {TrophyCountDisplayer} from '../trophy-count-displayer/trophy-count-displayer';
import {DecimalPipe, NgOptimizedImage} from '@angular/common';
import {Player} from '../../core/models/dto/player';
import {TrophyCount} from '../../core/models/dto/trophy-count';

@Component({
  selector: 'app-profile-summary',
  imports: [
    MatCardModule,
    TrophyCountDisplayer,
    NgOptimizedImage,
    DecimalPipe,
  ],
  templateUrl: './profile-summary.html',
  styleUrl: './profile-summary.scss',
})
export class ProfileSummary {
  @Input({required: true}) player!: Player;
  @Input({required: true}) trophyCount!: TrophyCount;
  @Input({required: true}) totalPlayedGames!: number;
  @Input({required: true}) totalEarnedTrophies!: number;
}
