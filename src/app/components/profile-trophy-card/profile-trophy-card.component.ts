import {Component, input} from '@angular/core';
import {Trophy} from '../../core/models/dto/trophy';
import {DatePipe, NgOptimizedImage} from '@angular/common';

@Component({
    selector: 'tq-profile-trophy-card',
    imports: [
        DatePipe,
        NgOptimizedImage
    ],
    templateUrl: './profile-trophy-card.component.html',
    styleUrl: './profile-trophy-card.component.scss',
})
export class ProfileTrophyCardComponent {
    readonly trophy = input.required<Trophy>();

    isExpanded: boolean = false;

    toggleExpansion(): void {
        this.isExpanded = !this.isExpanded;
    }

}
