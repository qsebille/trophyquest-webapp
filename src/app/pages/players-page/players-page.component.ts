import {Component} from '@angular/core';
import {PlayerListStore} from '../../core/store/player-list-store';
import {PlayerCard} from '../../components/player-card/player-card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../core/services/utils/navigator.service";

@Component({
    imports: [
        PlayerCard,
        MatProgressSpinnerModule,
    ],
    templateUrl: './players-page.component.html',
    styleUrl: './players-page.component.scss',
})
export class PlayersPage {

    constructor(
        private readonly _navigator: NavigatorService,
        public readonly playerListStore: PlayerListStore,
    ) {
    }

    ngOnInit(): void {
        this.playerListStore.reset();
        this.playerListStore.search();
    }

    navigateToProfilePage(playerId: string): void {
        this._navigator.goToProfilePage(playerId);
    }

    navigateToPlayerCollectionPage(
        collectionId: string,
        playerId: string
    ): void {
        this._navigator.goToPlayerCollectionPage(collectionId, playerId);
    }

}
