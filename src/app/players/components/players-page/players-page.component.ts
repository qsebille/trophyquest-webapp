import {Component, computed} from '@angular/core';
import {PlayerListStore} from '../../stores/player-list-store';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../../core/services/navigator.service";
import {AddPlayerFormComponent} from "../add-player-form/add-player-form.component";
import {AddPlayerStore} from "../../stores/add-player-store.service";
import {PlayerListComponent} from "../player-list/player-list.component";

@Component({
    imports: [
        MatProgressSpinnerModule,
        AddPlayerFormComponent,
        PlayerListComponent,
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

    readonly players = computed(() => this._playerListStore.playerSummaries());
    readonly totalPlayers = computed(() => this._playerListStore.total());
    readonly playerListStatus = computed(() => this._playerListStore.status());
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
