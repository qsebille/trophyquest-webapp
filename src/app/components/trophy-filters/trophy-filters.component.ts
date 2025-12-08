import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  templateUrl: './trophy-filters.component.html',
  styleUrl: './trophy-filters.component.scss',
})
export class TrophyFiltersComponent {
  @Input({required: false}) public initEarnedFilter: 'all' | 'earned' | 'notEarned' = 'all';
  @Output() public readonly showHiddenTrophies = new EventEmitter<boolean>();
  @Output() public readonly trophyEarnedFilterChanged = new EventEmitter<'all' | 'earned' | 'notEarned'>();

  // Bound with the radio buttons by ngModel
  wantedTrophyEarnedType: 'all' | 'earned' | 'notEarned' = 'all';

  private _showHiddenTrophies = false;

  ngOnInit(): void {
    this.wantedTrophyEarnedType = this.initEarnedFilter;
  }

  hiddenFilterChanges() {
    this._showHiddenTrophies = !this._showHiddenTrophies;
    this.showHiddenTrophies.emit(this._showHiddenTrophies);
  }

  earnedFilterChanges() {
    this.trophyEarnedFilterChanged.emit(this.wantedTrophyEarnedType);
  }
}
