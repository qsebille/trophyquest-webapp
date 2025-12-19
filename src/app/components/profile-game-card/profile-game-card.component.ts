import {Component, computed, input, output} from '@angular/core';
import {TrophyCountDisplayerComponent} from '../trophy-count-displayer/trophy-count-displayer.component';
import {PlayerGame} from '../../core/models/dto/player-game';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {DecimalPipe} from '@angular/common';

@Component({
    selector: 'app-profile-game-card',
    imports: [
        TrophyCountDisplayerComponent,
        MatProgressBarModule,
        DecimalPipe,
    ],
    templateUrl: './profile-game-card.component.html',
    styleUrl: './profile-game-card.component.scss',
})
export class ProfileGameCardComponent {
    readonly game = input.required<PlayerGame>();
    readonly clickOnTitle = output();

    readonly earnedTrophies = computed(() => this.game().earnedTrophies);
    readonly gameTrophies = computed(() => this.game().totalTrophies);
    readonly completionScore = computed(() => {
        const earnedTrophies: number = this.earnedTrophies().platinum +
            this.earnedTrophies().gold +
            this.earnedTrophies().silver +
            this.earnedTrophies().bronze;
        const totalTrophies: number = this.gameTrophies().platinum +
            this.gameTrophies().gold +
            this.gameTrophies().silver +
            this.gameTrophies().bronze;

        return earnedTrophies / totalTrophies * 100;
    });
    readonly isCompleted = computed(() => this.completionScore() === 100);
}
