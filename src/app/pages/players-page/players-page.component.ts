import {Component} from '@angular/core';
import {PlayerListStore} from '../../core/store/player-list-store';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  imports: [
    MatIconModule,
    MatCardModule,
    MatButton,
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

  goToProfile(playerId: string) {
    this._router.navigate(['/profile', playerId]).then(() => console.info(`Navigated to profile page: ${playerId}`));
  }

}
