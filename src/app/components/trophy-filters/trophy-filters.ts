import {Component, EventEmitter, Output} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-trophy-filters',
  imports: [
    MatSlideToggleModule,
    MatRadioModule,
    FormsModule,
  ],
  templateUrl: './trophy-filters.html',
  styleUrl: './trophy-filters.scss',
})
export class TrophyFilters {
  @Output() public readonly showHiddenTrophies = new EventEmitter<boolean>();
  @Output() public readonly trophyEarnedFilterChanged = new EventEmitter<'all' | 'earned' | 'unearned'>();

  wantedTrophyEarnedType: 'all' | 'earned' | 'unearned' = 'all';
  private _showHiddenTrophies = false;

  hiddenFilterChanges() {
    this._showHiddenTrophies = !this._showHiddenTrophies;
    this.showHiddenTrophies.emit(this._showHiddenTrophies);
  }

  earnedFilterChanges() {
    this.trophyEarnedFilterChanged.emit(this.wantedTrophyEarnedType);
  }
}
