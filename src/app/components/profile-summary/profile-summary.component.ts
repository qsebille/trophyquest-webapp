import {Component, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {TrophyCountDisplayerComponent} from '../trophy-count-displayer/trophy-count-displayer.component';
import {DecimalPipe, NgOptimizedImage} from '@angular/common';
import {Player} from '../../core/models/dto/player';
import {TrophyCountPerType} from '../../core/models/dto/trophy-count-per-type';
import {TrophyQuestBlockComponent} from "../trophyquest-block/trophy-quest-block.component";
import {TrophyQuestBlockContentTemplate, TrophyQuestBlockHeaderTemplate} from "../../templates/block.template";

@Component({
    selector: 'tq-profile-summary',
    imports: [
        MatCardModule,
        TrophyCountDisplayerComponent,
        NgOptimizedImage,
        DecimalPipe,
        TrophyQuestBlockComponent,
        TrophyQuestBlockContentTemplate,
        TrophyQuestBlockHeaderTemplate,
    ],
    templateUrl: './profile-summary.component.html',
    styleUrl: './profile-summary.component.scss',
})
export class ProfileSummaryComponent {
    readonly player = input.required<Player>();
    readonly trophyCount = input.required<TrophyCountPerType>();
    readonly totalGamesPlayed = input.required<number>();
    readonly totalEarnedTrophies = input.required<number>();
}
