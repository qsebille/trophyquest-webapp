import {Component, computed} from '@angular/core';
import {PlayerListStore} from '../../core/store/player-list-store';
import {PlayerCardComponent} from '../../components/player-card/player-card.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../core/services/utils/navigator.service";
import {ErrorMessageComponent} from "../../components/error-message/error-message.component";

@Component({
    imports: [
        PlayerCardComponent,
        MatProgressSpinnerModule,
        ErrorMessageComponent,
    ],
    templateUrl: './players-page.component.html',
    styleUrl: './players-page.component.scss',
})
export class PlayersPageComponent {

    constructor(
        private readonly _navigator: NavigatorService,
        private readonly _playerListStore: PlayerListStore,
    ) {
    }

    readonly playerSummaries = computed(() => this._playerListStore.playerSummaries());
    readonly isLoadingPlayers = computed(() => this._playerListStore.isLoading());
    readonly hasFailedLoadingPlayers = computed(() => this._playerListStore.isError());
    readonly hasMorePlayersToLoad = computed(() => this._playerListStore.isPartiallyLoaded());

    ngOnInit(): void {
        this._playerListStore.reset();
        this._playerListStore.search();
    }

    retrievePlayers(): void {
        this._playerListStore.search();
    }

    loadMorePlayers(): void {
        this._playerListStore.loadMore();
    }

    navigateToProfilePage(playerId: string): void {
        this._navigator.goToProfilePage(playerId);
    }

    navigateToPlayerGamePage(
        gameId: string,
        playerId: string
    ): void {
        this._navigator.goToPlayerGamePage(gameId, playerId);
    }

}
