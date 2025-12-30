import {Component, computed, input, output} from '@angular/core';
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {PlayerSummary} from "../../../core/models/dto/player-summary";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PlayerCardComponent} from "../player-card/player-card.component";

@Component({
    selector: 'tq-player-list',
    imports: [
        ErrorMessageComponent,
        MatProgressSpinnerModule,
        PlayerCardComponent
    ],
    templateUrl: './player-list.component.html',
    styleUrl: './player-list.component.scss',
})
export class PlayerListComponent {
    readonly players = input<PlayerSummary[]>([]);
    readonly total = input<number>(0);
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);

    readonly retrievePlayers = output<void>();
    readonly loadMorePlayers = output<void>();
    readonly clickOnPlayer = output<string>();
    readonly clickOnGame = output<{ gameId: string, playerId: string }>();

    readonly isLoading = computed(() => this.status() === LoadingStatus.LOADING);
    readonly isError = computed(() => this.status() === LoadingStatus.ERROR);
    readonly hasMorePlayersToLoad = computed(() => this.status() === LoadingStatus.PARTIALLY_LOADED);
}
