import {Component, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {TrophyCountDisplayerComponent} from '../trophy-count-displayer/trophy-count-displayer.component';
import {DecimalPipe, NgOptimizedImage} from '@angular/common';
import {Player} from '../../core/models/dto/player';
import {TrophyCountPerType} from '../../core/models/dto/trophy-count-per-type';
import {TrophyquestBlockComponent} from "../trophyquest-block/trophyquest-block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../templates/block.template";

@Component({
    selector: 'app-profile-summary',
    imports: [
        MatCardModule,
        TrophyCountDisplayerComponent,
        NgOptimizedImage,
        DecimalPipe,
        TrophyquestBlockComponent,
        BlockContentTemplate,
        BlockHeaderTemplate,

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
