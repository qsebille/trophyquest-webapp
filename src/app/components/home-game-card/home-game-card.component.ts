import {Component, input} from '@angular/core';
import {DecimalPipe, NgOptimizedImage} from '@angular/common';
import {RecentlyPlayedGame} from "../../core/models/dto/recently-played-game";

@Component({
    selector: 'app-home-game-card',
    imports: [
        NgOptimizedImage,
        DecimalPipe
    ],
    templateUrl: './home-game-card.component.html',
    styleUrl: './home-game-card.component.scss',
})
export class HomeGameCardComponent {
    readonly game = input.required<RecentlyPlayedGame>();
}
