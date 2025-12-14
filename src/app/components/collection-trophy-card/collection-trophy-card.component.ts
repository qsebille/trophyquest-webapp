import {Component, computed, input} from '@angular/core';
import {Trophy} from '../../core/models/dto/trophy';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'app-collection-trophy-card',
    imports: [
        MatCardModule,
        MatIconModule,
        NgOptimizedImage,
        DatePipe,
    ],
    templateUrl: './collection-trophy-card.component.html',
    styleUrl: './collection-trophy-card.component.scss',
})
export class CollectionTrophyCardComponent {
    readonly trophy = input.required<Trophy>();
    readonly imageSize = input<number>(50);
    readonly showHiddenTrophies = input<boolean>(false);
    
    readonly trophyIsEarned = computed(() => this.trophy().earnedDate !== null);

    get isTrophyHidden(): boolean {
        return !this.showHiddenTrophies && (this.trophy().isHidden ?? false) && this.trophyIsEarned();
    }

}
