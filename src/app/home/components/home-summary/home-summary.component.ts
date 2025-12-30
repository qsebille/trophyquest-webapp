import {Component, computed, input, output} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {BlockComponent} from "../../../core/components/trophyquest-block/block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../../core/templates/block.template";

@Component({
    selector: 'tq-home-summary',
    imports: [
        DecimalPipe,
        MatIconModule,
        ErrorMessageComponent,
        MatProgressSpinnerModule,
        BlockComponent,
        BlockHeaderTemplate,
        BlockContentTemplate,
    ],
    templateUrl: './home-summary.component.html',
    styleUrl: './home-summary.component.scss',
})
export class HomeSummaryComponent {
    readonly nbGames = input<number>(0);
    readonly nbPlayers = input<number>(0);
    readonly nbTrophies = input<number>(0);
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);

    readonly clickOnPlayers = output<void>();

    readonly isLoading = computed(() => this.status() === LoadingStatus.LOADING);
    readonly hasFailed = computed(() => this.status() === LoadingStatus.ERROR);
}
