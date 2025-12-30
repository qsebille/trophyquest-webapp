import {Component, computed, input, output} from '@angular/core';
import {PlayerGame} from "../../../core/models/dto/player-game";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {BlockComponent} from "../../../core/components/trophyquest-block/block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../../core/templates/block.template";
import {ProfileGameCardComponent} from "../profile-game-card/profile-game-card.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
    selector: 'tq-profile-game-list',
    imports: [
        BlockComponent,
        BlockContentTemplate,
        BlockHeaderTemplate,
        MatProgressSpinnerModule,
        ProfileGameCardComponent
    ],
    templateUrl: './profile-game-list.component.html',
    styleUrl: './profile-game-list.component.scss',
})
export class ProfileGameListComponent {
    readonly games = input<PlayerGame[]>([]);
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);

    readonly clickOnGame = output<string>();
    readonly loadMoreGames = output();

    readonly isLoading = computed(() => this.status() === LoadingStatus.LOADING);
    readonly hasMoreGamesToLoad = computed(() => this.status() === LoadingStatus.PARTIALLY_LOADED);
}
