import {Component, input, output} from '@angular/core';
import {ObtainedTrophy} from '../../../core/models/dto/obtained-trophy';
import {DatePipe, NgOptimizedImage} from '@angular/common';

@Component({
    selector: 'app-home-trophy-card',
    imports: [
        NgOptimizedImage,
        DatePipe
    ],
    templateUrl: './home-trophy-card.component.html',
    styleUrl: './home-trophy-card.component.scss',
})
export class HomeTrophyCardComponent {
    readonly trophy = input.required<ObtainedTrophy>();
    readonly clickOnGameTitle = output();
}
