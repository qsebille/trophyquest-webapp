import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameStore} from '../../core/store/game-store';
import {Trophy} from '../../core/models/dto/trophy';
import {TrophyCount} from '../../core/models/dto/trophy-count';
import {MatCardModule} from '@angular/material/card';
import {TrophyCard} from '../../components/trophy-card/trophy-card';

@Component({
  selector: 'app-game-page',
  imports: [
    MatCardModule,
    TrophyCard
  ],
  templateUrl: './game-page.html',
  styleUrl: './game-page.scss',
})
export class GamePage {
  gameId!: string | null;
  collectionId!: string | null;
  userId!: string | null;


  constructor(
    private readonly _route: ActivatedRoute,
    public readonly gameStore: GameStore
  ) {
  }

  ngOnInit(): void {
    this.gameId = this._route.snapshot.paramMap.get('gameId');
    this.collectionId = this._route.snapshot.queryParamMap.get('collectionId');
    this.userId = this._route.snapshot.queryParamMap.get('userId');
    this.gameStore.fetchUserGame(this.userId, this.gameId, this.collectionId);
  }

  protected countEarnedTrophies(trophies: Trophy[]): TrophyCount {
    return {
      platinum: trophies.filter(t => t.trophyType === 'platinum' && t.earnedDate !== null).length,
      gold: trophies.filter(t => t.trophyType === 'gold' && t.earnedDate !== null).length,
      silver: trophies.filter(t => t.trophyType === 'silver' && t.earnedDate !== null).length,
      bronze: trophies.filter(t => t.trophyType === 'bronze' && t.earnedDate !== null).length,
    }
  }
}
