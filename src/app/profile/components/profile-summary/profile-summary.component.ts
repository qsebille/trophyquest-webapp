import {Component, computed, input} from '@angular/core';
import {TrophyCountDisplayerComponent} from '../../../core/trophy-count-displayer/trophy-count-displayer.component';
import {DecimalPipe, NgOptimizedImage} from '@angular/common';
import {Player} from '../../../core/models/dto/player';
import {TrophyCountPerType} from '../../../core/models/dto/trophy-count-per-type';
import {BlockComponent} from "../../../core/components/trophyquest-block/block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../../core/templates/block.template";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoadingStatus} from "../../../core/models/loading-status.enum";

@Component({
    selector: 'tq-profile-summary',
    imports: [
        TrophyCountDisplayerComponent,
        NgOptimizedImage,
        DecimalPipe,
        BlockComponent,
        BlockContentTemplate,
        BlockHeaderTemplate,
        MatProgressSpinnerModule,
    ],
    templateUrl: './profile-summary.component.html',
    styleUrl: './profile-summary.component.scss',
})
export class ProfileSummaryComponent {
    readonly player = input.required<Player>();
    readonly trophyCount = input.required<TrophyCountPerType>();
    readonly totalGamesPlayed = input.required<number>();
    readonly totalEarnedTrophies = input.required<number>();
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);

    readonly isLoading = computed(() => this.status() === LoadingStatus.LOADING);
}
