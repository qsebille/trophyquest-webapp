import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameStore} from '../../core/store/game-store';
import {MatCardModule} from '@angular/material/card';
import {TrophyCard} from '../../components/trophy-card/trophy-card';
import {GameSummary} from '../../components/game-summary/game-summary';
import {TrophyFilters} from '../../components/trophy-filters/trophy-filters';
import {Trophy} from '../../core/models/dto/trophy';

@Component({
  selector: 'app-game-page',
  imports: [
    MatCardModule,
    TrophyCard,
    GameSummary,
    TrophyFilters,
  ],
  templateUrl: './game-page.html',
  styleUrl: './game-page.scss',
})
export class GamePage {
  gameId!: string | null;
  collectionId!: string | null;
  userId!: string | null;

  shouldShowHiddenTrophies: boolean = false;

  private _trophyEarnedFilter: 'all' | 'earned' | 'unearned' = 'all';

  constructor(
    private readonly _route: ActivatedRoute,
    public readonly gameStore: GameStore
  ) {
  }

  getFilteredTrophies(trophies: Trophy[]): Trophy[] {
    switch (this._trophyEarnedFilter) {
      case 'all':
        return trophies;
      case 'earned':
        return trophies.filter(t => t.earnedDate !== null);
      case 'unearned':
        return trophies.filter(t => t.earnedDate === null);
    }
  }

  baseGameTrophies(): Trophy[] {
    return this.getFilteredTrophies(this.gameStore.baseGameTrophies()?.trophies ?? []);
  }

  ngOnInit(): void {
    this.gameId = this._route.snapshot.paramMap.get('gameId');
    this.collectionId = this._route.snapshot.queryParamMap.get('collectionId');
    this.userId = this._route.snapshot.queryParamMap.get('userId');
    this.gameStore.fetchUserGame(this.userId, this.gameId, this.collectionId);
  }

  showHiddenTrophies($event: boolean): void {
    this.shouldShowHiddenTrophies = $event;
  }

  changeTrophyEarnedType($event: 'all' | 'earned' | 'unearned'): void {
    this._trophyEarnedFilter = $event;
  }

}
