import {Component} from '@angular/core';
import {PlayerListStore} from '../../core/store/player-list-store';
import {Router} from '@angular/router';
import {PlayerCard} from '../../components/player-card/player-card';
import {PlayerSummary} from '../../core/models/dto/player-summary';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  imports: [
    PlayerCard,
    MatProgressSpinnerModule,
  ],
  templateUrl: './players-page.component.html',
  styleUrl: './players-page.component.scss',
})
export class PlayersPage {

  constructor(
    private readonly _router: Router,
    public readonly playerListStore: PlayerListStore,
  ) {
  }

  ngOnInit(): void {
    this.playerListStore.reset();
    this.playerListStore.search();
  }

  goToProfile(playerSummary: PlayerSummary): void {
    const playerId: string = playerSummary.player.id;
    this._router.navigate(['/profile', playerId]).then(() => console.info(`Navigated to profile page: ${playerId}`));
  }

  goToGamePage(playerSummary: PlayerSummary): void {
    const playerId: string = playerSummary.player.id;
    const gameId: string = playerSummary.lastPlayedGameId;
    const collectionId: string = playerSummary.lastPlayedCollectionId;
    this._router.navigate(['/game', gameId], {queryParams: {collectionId, playerId}})
      .then(() => console.info(`Navigated to game page: ${gameId}, collection ${collectionId}, player ${playerId}`));
  }

}
