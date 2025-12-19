import {Component, input} from '@angular/core';
import {GameSummary} from '../../core/models/dto/game-summary';
import {TrophyCountDisplayerComponent} from "../trophy-count-displayer/trophy-count-displayer.component";
import {TrophyCount} from "../../core/models/dto/trophy-count";

@Component({
    selector: 'app-game-summary',
    imports: [
        TrophyCountDisplayerComponent
    ],
    templateUrl: './game-summary.component.html',
    styleUrl: './game-summary.component.scss',
})
export class GameSummaryComponent {
    readonly gameSummary = input.required<GameSummary>();

    get trophyCount(): TrophyCount {
        return this.gameSummary().trophyCount ?? {platinum: 0, gold: 0, silver: 0, bronze: 0};
    }
}
