import {Component, input} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Component({
    selector: 'app-home-summary',
    imports: [
        DecimalPipe
    ],
    templateUrl: './home-summary.component.html',
    styleUrl: './home-summary.component.scss',
})
export class HomeSummaryComponent {
    readonly nbGames = input<number>(0);
    readonly nbPlayers = input<number>(0);
    readonly nbTrophies = input<number>(0);
}
