import {Component, computed, input, output} from '@angular/core';
import {DecimalPipe, NgOptimizedImage} from '@angular/common';
import {PlatformLabelComponent} from "../../../core/components/platform-label/platform-label.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {PlayedTrophySetSearchElement} from "../../../core/api/dtos/trophy-set/played-trophy-set-search-element";

@Component({
    selector: 'tq-profile-trophy-set-card',
    imports: [
        DecimalPipe,
        MatProgressSpinnerModule,
        MatIconModule,
        PlatformLabelComponent,
        NgOptimizedImage,
    ],
    templateUrl: './profile-trophy-set-card.component.html',
    styleUrl: './profile-trophy-set-card.component.scss',
})
export class ProfileTrophySetCardComponent {
    readonly trophySet = input.required<PlayedTrophySetSearchElement>();
    readonly clickOnTitle = output();

    readonly completionScore = computed(() => {
        const earnedTrophies: number = this.trophySet().totalEarnedPlatinum +
            this.trophySet().totalEarnedGold +
            this.trophySet().totalEarnedSilver +
            this.trophySet().totalEarnedBronze;

        return earnedTrophies / this.trophySet().totalTrophies * 100;
    });
    readonly isCompleted = computed(() => this.completionScore() === 100);

    getEarnedTrophyByType(type: string): number {
        switch (type) {
            case 'platinum':
                return this.trophySet().totalEarnedPlatinum;
            case 'gold':
                return this.trophySet().totalEarnedGold;
            case 'silver':
                return this.trophySet().totalEarnedSilver;
            case 'bronze':
                return this.trophySet().totalEarnedBronze;
            default:
                return 0;
        }
    }
}
