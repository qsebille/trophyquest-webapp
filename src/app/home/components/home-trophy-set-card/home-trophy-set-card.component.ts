import {Component, input, output} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {RecentTrophySet} from "../../../core/api/dtos/trophy-set/recent-trophy-set";

@Component({
    selector: 'tq-home-trophy-set-card',
    imports: [
        DecimalPipe
    ],
    templateUrl: './home-trophy-set-card.component.html',
    styleUrl: './home-trophy-set-card.component.scss',
})
export class HomeTrophySetCardComponent {
    readonly trophySet = input.required<RecentTrophySet>();
    readonly clickOnTrophySet = output();
}
