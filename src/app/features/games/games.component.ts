import {Component} from '@angular/core';
import {MatCard, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {Store} from '../../core/store/store';
import {LoadingStatus} from '../../core/models/loading-status.enum';

@Component({
  selector: 'app-games',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent {
  protected readonly LoadingStatus = LoadingStatus;

  constructor(public store: Store) {
  }

  ngOnInit(): void {
    this.store.loadGames();
  }

}
