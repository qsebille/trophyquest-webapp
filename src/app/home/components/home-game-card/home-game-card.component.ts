import {Component, input, output} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {PopularGame} from "../../../core/models/dto/popular-game";

@Component({
    selector: 'tq-home-game-card',
    imports: [
        DecimalPipe
    ],
    templateUrl: './home-game-card.component.html',
    styleUrl: './home-game-card.component.scss',
})
export class HomeGameCardComponent {
    readonly game = input.required<PopularGame>();
    readonly clickOnGameTitle = output();
}
