import {Component} from '@angular/core';
import {GameListStore} from '../../core/store/game-list-store';
import {HomeGameCard} from '../../components/home-game-card/home-game-card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ObtainedTrophiesStore} from '../../core/store/obtained-trophies-store';
import {HomeTrophyCardComponent} from '../../components/home-trophy-card/home-trophy-card.component';
import {HomeSummary} from '../../components/home-summary/home-summary';
import {PlayerListStore} from '../../core/store/player-list-store';
import {NavigatorService} from "../../core/services/utils/navigator.service";

@Component({
    selector: 'app-home-page',
    imports: [
        HomeGameCard,
        HomeTrophyCardComponent,
        MatProgressSpinnerModule,
        HomeSummary,
    ],
    templateUrl: './home-page.html',
    styleUrl: './home-page.scss',
})
export class HomePage {
    constructor(
        private readonly _navigator: NavigatorService,
        public readonly gameListStore: GameListStore,
        public readonly obtainedTrophiesStore: ObtainedTrophiesStore,
        public readonly playerListStore: PlayerListStore,
    ) {
    }

    ngOnInit(): void {
        this.gameListStore.resetState();
        this.gameListStore.search();
        this.obtainedTrophiesStore.resetState();
        this.obtainedTrophiesStore.search();
        this.playerListStore.reset();
        this.playerListStore.count();
    }

    loadMoreGames(): void {
        this.gameListStore.loadMore();
    }

    loadMoreTrophies(): void {
        this.obtainedTrophiesStore.loadMore();
    }

    navigateToProfilePage(playerId: string): void {
        this._navigator.goToProfilePage(playerId);
    }
}
