import {Component, input} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {PopularGame} from "../../core/models/dto/popular-game";

@Component({
    selector: 'app-home-game-card',
    imports: [
        DecimalPipe
    ],
    templateUrl: './home-game-card.component.html',
    styleUrl: './home-game-card.component.scss',
})
export class HomeGameCardComponent {
    readonly game = input.required<PopularGame>();
}
