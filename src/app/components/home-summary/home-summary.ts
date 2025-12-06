import {Component, Input} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-home-summary',
  imports: [
    DecimalPipe
  ],
  templateUrl: './home-summary.html',
  styleUrl: './home-summary.scss',
})
export class HomeSummary {
  @Input({required: true}) nbGames: number = 0;
  @Input({required: true}) nbPlayers: number = 0;
  @Input({required: true}) nbTrophies: number = 0;
}
