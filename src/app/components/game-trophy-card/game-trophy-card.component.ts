import {Component, computed, input} from '@angular/core';
import {Trophy} from '../../core/models/dto/trophy';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'app-game-trophy-card',
    imports: [
        MatCardModule,
        MatIconModule,
        NgOptimizedImage,
        DatePipe,
    ],
    templateUrl: './game-trophy-card.component.html',
    styleUrl: './game-trophy-card.component.scss',
})
export class GameTrophyCardComponent {
    readonly trophy = input.required<Trophy>();
    readonly imageSize = input<number>(50);
    readonly showHiddenTrophies = input<boolean>(false);

    readonly isTrophyEarned = computed(() => this.trophy().earnedDate !== null);
    readonly isTrophyHidden = computed(() => {
        if (this.showHiddenTrophies() || this.isTrophyEarned()) return false;
        else return this.trophy().isHidden ?? false
    });

}
