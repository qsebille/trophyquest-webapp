import {Component, Input} from '@angular/core';
import {Player} from '../../core/models/dto/player';
import {MatCardModule} from '@angular/material/card';
import {TrophyCount} from '../../core/models/dto/trophy-count';
import {TrophyCountDisplayer} from '../trophy-count-displayer/trophy-count-displayer';

@Component({
  selector: 'app-profile-summary',
  imports: [
    MatCardModule,
    TrophyCountDisplayer,
  ],
  templateUrl: './profile-summary.html',
  styleUrl: './profile-summary.scss',
})
export class ProfileSummary {
  @Input({required: true}) profile: Player | undefined;
  @Input({required: true}) trophyCount: TrophyCount = {
    platinum: 0,
    gold: 0,
    silver: 0,
    bronze: 0,
  };
}
