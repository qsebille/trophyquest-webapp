import {Component, Input} from '@angular/core';
import {Game} from '../../core/models/dto/game';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-game-list',
  imports: [
    MatExpansionModule,
    NgClass
  ],
  templateUrl: './game-list.html',
  styleUrl: './game-list.scss',
})
export class GameList {
  @Input({required: true}) gameList: Game[] = [];

}
