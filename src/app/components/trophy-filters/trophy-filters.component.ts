import {Component, input, output} from '@angular/core';
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
    readonly filter = input<'all' | 'earned' | 'notEarned'>('all');
    readonly filterChange = output<'all' | 'earned' | 'notEarned'>();
    readonly showHiddenTrophyChange = output<boolean>();

    private _showHiddenTrophies = false;

    changeFilter(newFilter: 'all' | 'earned' | 'notEarned') {
        this.filterChange.emit(newFilter);
    }

    hiddenFilterChanges() {
        this._showHiddenTrophies = !this._showHiddenTrophies;
        this.showHiddenTrophyChange.emit(this._showHiddenTrophies);
    }
}
