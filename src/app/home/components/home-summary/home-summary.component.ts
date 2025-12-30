import {Component, computed, input, output} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {ErrorMessageComponent} from "../../../components/utils/error-message/error-message.component";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {TrophyquestBlockComponent} from "../../../components/trophyquest-block/trophyquest-block.component";
import {TrophyQuestBlockContentTemplate, TrophyQuestBlockHeaderTemplate} from "../../../templates/block.template";

@Component({
    selector: 'app-home-summary',
    imports: [
        DecimalPipe,
        MatIconModule,
        ErrorMessageComponent,
        MatProgressSpinnerModule,
        TrophyquestBlockComponent,
        TrophyQuestBlockHeaderTemplate,
        TrophyQuestBlockContentTemplate,
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
