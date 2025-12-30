import {Component, computed, input, output} from '@angular/core';
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {HomeGameCardComponent} from "../home-game-card/home-game-card.component";
import {PopularGame} from "../../../core/models/dto/popular-game";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {BlockComponent} from "../../../core/components/trophyquest-block/block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../../core/templates/block.template";

@Component({
    selector: 'tq-home-game-list',
    imports: [
        MatProgressSpinnerModule,
        ErrorMessageComponent,
        HomeGameCardComponent,
        BlockComponent,
        BlockHeaderTemplate,
        BlockContentTemplate
    ],
    templateUrl: './home-game-list.component.html',
    styleUrl: './home-game-list.component.scss',
})
export class HomeGameListComponent {
    readonly games = input<PopularGame[]>([])
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);
    readonly clickOnGameTitle = output<string>();

    readonly isLoadingGames = computed(() => this.status() === LoadingStatus.LOADING);
    readonly hasFailedLoadingGames = computed(() => this.status() === LoadingStatus.ERROR);
    readonly hasNoPopularGames = computed(() => this.games().length == 0 && this.status() === LoadingStatus.FULLY_LOADED);
}
