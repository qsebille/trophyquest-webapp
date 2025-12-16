import {Component, input} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-home-summary',
    imports: [
        DecimalPipe,
        MatIconModule
    ],
    templateUrl: './home-summary.component.html',
    styleUrl: './home-summary.component.scss',
})
export class HomeSummaryComponent {
    readonly nbGames = input<number>(0);
    readonly nbPlayers = input<number>(0);
    readonly nbTrophies = input<number>(0);
}
