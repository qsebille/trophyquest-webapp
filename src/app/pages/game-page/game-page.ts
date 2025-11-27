import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameStore} from '../../core/store/game-store';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-game-page',
  imports: [
    JsonPipe
  ],
  templateUrl: './game-page.html',
  styleUrl: './game-page.scss',
})
export class GamePage {
  gameId!: string | null;
  collectionId!: string | null;

  constructor(private readonly _route: ActivatedRoute, public readonly gameStore: GameStore) {
  }

  ngOnInit(): void {
    this.gameId = this._route.snapshot.paramMap.get('gameId');
    this.collectionId = this._route.snapshot.queryParamMap.get('collectionId');
    this.gameStore.fetch(this.gameId);
  }

}
