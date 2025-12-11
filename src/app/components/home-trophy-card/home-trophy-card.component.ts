import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ObtainedTrophy} from '../../core/models/dto/obtained-trophy';
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
    @Input({required: true}) trophy!: ObtainedTrophy;
    @Output() clickOnPlayer = new EventEmitter();
}
