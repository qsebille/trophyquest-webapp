import {Component, computed, input, output} from '@angular/core';
import {PlayerGame} from '../../core/models/dto/player-game';
import {DecimalPipe, NgOptimizedImage} from '@angular/common';
import {PlatformLabelComponent} from "../utils/platform-label/platform-label.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'tq-profile-game-card',
    imports: [
        DecimalPipe,
        MatProgressSpinnerModule,
        MatIconModule,
        PlatformLabelComponent,
        NgOptimizedImage,
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

    getEarnedTrophyByType(type: string): number {
        switch (type) {
            case 'platinum':
                return this.earnedTrophies().platinum;
            case 'gold':
                return this.earnedTrophies().gold;
            case 'silver':
                return this.earnedTrophies().silver;
            case 'bronze':
                return this.earnedTrophies().bronze;
            default:
                return 0;
        }
    }
}
