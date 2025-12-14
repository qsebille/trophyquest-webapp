import {Component, computed, input, output} from '@angular/core';
import {TrophyCountDisplayerComponent} from '../trophy-count-displayer/trophy-count-displayer.component';
import {PlayerCollection} from '../../core/models/dto/player-collection';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {DecimalPipe} from '@angular/common';

@Component({
    selector: 'app-profile-collection-card',
    imports: [
        TrophyCountDisplayerComponent,
        MatProgressBarModule,
        DecimalPipe,
    ],
    templateUrl: './profile-collection-card.component.html',
    styleUrl: './profile-collection-card.component.scss',
})
export class ProfileCollectionCardComponent {
    readonly collection = input.required<PlayerCollection>();
    readonly clickOnTitle = output();

    readonly earnedTrophies = computed(() => this.collection().earnedTrophies);
    readonly collectionTrophies = computed(() => this.collection().collectionTrophies);
    readonly completionScore = computed(() => {
        const earnedTrophies: number = this.earnedTrophies().platinum +
            this.earnedTrophies().gold +
            this.earnedTrophies().silver +
            this.earnedTrophies().bronze;
        const totalTrophies: number = this.collectionTrophies().platinum +
            this.collectionTrophies().gold +
            this.collectionTrophies().silver +
            this.collectionTrophies().bronze;

        return earnedTrophies / totalTrophies * 100;
    });
    readonly isCompleted = computed(() => this.completionScore() === 100);
}
