import {Component, computed} from '@angular/core';
import {PlayerListStore} from '../../core/store/player-list-store';
import {PlayerCardComponent} from '../../components/player-card/player-card.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../core/services/utils/navigator.service";
import {ErrorMessageComponent} from "../../components/utils/error-message/error-message.component";
import {AddPlayerFormComponent} from "../../components/players/add-player-form/add-player-form.component";
import {AddPlayerStore} from "../../core/store/players/add-player-store.service";

@Component({
    imports: [
        PlayerCardComponent,
        MatProgressSpinnerModule,
        ErrorMessageComponent,
        AddPlayerFormComponent,
    ],
    templateUrl: './players-page.component.html',
    styleUrl: './players-page.component.scss',
})
export class PlayersPageComponent {

    constructor(
        private readonly _navigator: NavigatorService,
        private readonly _playerListStore: PlayerListStore,
        private readonly _addPlayerStore: AddPlayerStore,
    ) {
    }

    readonly playerSummaries = computed(() => this._playerListStore.playerSummaries());
    readonly nbOfPlayers = computed(() => this._playerListStore.total());
    readonly isLoadingPlayers = computed(() => this._playerListStore.isLoading());
    readonly hasFailedLoadingPlayers = computed(() => this._playerListStore.isError());
    readonly hasMorePlayersToLoad = computed(() => this._playerListStore.isPartiallyLoaded());
    readonly addPlayerStatus = computed(() => this._addPlayerStore.status());

    ngOnInit(): void {
        this.retrievePlayers();
    }

    retrievePlayers(): void {
        this._playerListStore.reset();
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

    addPlayer(pseudo: string): void {
        this._addPlayerStore.addPlayer(pseudo);
    }

}
