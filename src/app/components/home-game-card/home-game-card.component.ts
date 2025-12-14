import {Component, input} from '@angular/core';
import {Game} from '../../core/models/dto/game';
import {NgOptimizedImage} from '@angular/common';

@Component({
    selector: 'app-home-game-card',
    imports: [
        NgOptimizedImage
    ],
    templateUrl: './home-game-card.component.html',
    styleUrl: './home-game-card.component.scss',
})
export class HomeGameCardComponent {
    readonly game = input.required<Game>();
}
