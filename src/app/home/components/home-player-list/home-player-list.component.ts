import {Component, computed, input, output} from '@angular/core';
import {RecentPlayerResponse} from "../../../core/models/dto/recent-player-response";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {TrophyquestBlockComponent} from "../../../components/trophyquest-block/trophyquest-block.component";
import {TrophyQuestBlockContentTemplate, TrophyQuestBlockHeaderTemplate} from "../../../templates/block.template";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ErrorMessageComponent} from "../../../components/utils/error-message/error-message.component";
import {SectionListComponent} from "../../../components/section-list/section-list.component";
import {HomePlayerCardComponent} from "../home-player-card/home-player-card.component";
import {HomeTrophyCardComponent} from "../home-trophy-card/home-trophy-card.component";
import {SectionListContentTemplate, SectionListHeaderTemplate} from "../../../templates/section-list.template";

@Component({
    selector: 'app-home-player-list',
    imports: [
        TrophyquestBlockComponent,
        TrophyQuestBlockHeaderTemplate,
        TrophyQuestBlockContentTemplate,
        MatProgressSpinnerModule,
        ErrorMessageComponent,
        SectionListComponent,
        HomePlayerCardComponent,
        HomeTrophyCardComponent,
        SectionListHeaderTemplate,
        SectionListContentTemplate,
    ],
    templateUrl: './home-player-list.component.html',
    styleUrl: './home-player-list.component.scss',
})
export class HomePlayerListComponent {
    readonly players = input<RecentPlayerResponse[]>([]);
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);

    readonly clickOnPlayer = output<string>();
    readonly clickOnGame = output<{ gameId: string, playerId: string }>();

    readonly isLoadingPlayers = computed(() => this.status() === LoadingStatus.LOADING);
    readonly hasFailedLoadingPlayers = computed(() => this.status() === LoadingStatus.ERROR);
    readonly hasNoRecentPlayers = computed(() => this.players().length == 0 && this.status() === LoadingStatus.FULLY_LOADED);
}
