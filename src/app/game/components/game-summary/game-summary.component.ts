import {Component, input} from '@angular/core';
import {GameSummary} from '../../../core/models/dto/game-summary';
import {
    TrophyCountDisplayerComponent
} from "../../../components/trophy-count-displayer/trophy-count-displayer.component";
import {TrophyCountPerType} from "../../../core/models/dto/trophy-count-per-type";
import {PlatformLabelComponent} from "../../../components/utils/platform-label/platform-label.component";

@Component({
    selector: 'tq-game-summary',
    imports: [
        TrophyCountDisplayerComponent,
        PlatformLabelComponent
    ],
    templateUrl: './game-summary.component.html',
    styleUrl: './game-summary.component.scss',
})
export class GameSummaryComponent {
    readonly gameSummary = input<GameSummary | null>(null);

    get trophyCount(): TrophyCountPerType {
        return this.gameSummary()?.trophyCount ?? {platinum: 0, gold: 0, silver: 0, bronze: 0};
    }
}
