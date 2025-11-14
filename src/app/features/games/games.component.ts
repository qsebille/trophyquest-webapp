import { Component } from '@angular/core';
import {GameListService} from '../../core/services/game-list.service';
import {Observable} from 'rxjs';
import {Game} from '../../core/models/game';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';

@Component({
  selector: 'app-games',
  imports: [
    AsyncPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    NgOptimizedImage
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent {

  constructor(public gameListService: GameListService) {
  }

  public games$: Observable<Game[]> | undefined;

  ngOnInit(): void {
    this.games$ = this.gameListService.getGameList();
  }


}
