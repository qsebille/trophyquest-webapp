import {Component, computed, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameSummaryStore} from '../../stores/game-summary-store.service';
import {GameTrophiesStore} from '../../stores/game-trophies-store.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TrophyFiltersComponent} from '../../../components/trophy-filters/trophy-filters.component';
import {GameSummaryComponent} from "../game-summary/game-summary.component";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {GameTrophyListComponent} from "../game-trophy-list/game-trophy-list.component";
import {TrophyFilters} from "../../../core/models/filters/trophy-filters";

@Component({
    selector: 'app-game-page',
    imports: [
        MatProgressSpinnerModule,
        TrophyFiltersComponent,
        GameSummaryComponent,
        GameTrophyListComponent,
    ],
    templateUrl: './game-page.component.html',
    styleUrl: './game-page.component.scss',
})
export class GamePageComponent {
    gameId: string | null;
    playerId: string | null;

    readonly trophyFilters = signal<TrophyFilters>({
        showHidden: false,
        earned: 'all',
    });

    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _gameSummaryStore: GameSummaryStore,
        private readonly _gameTrophiesStore: GameTrophiesStore,
    ) {
        this.gameId = this._route.snapshot.paramMap.get('gameId');
        this.playerId = this._route.snapshot.queryParamMap.get('playerId');
    }

    readonly gameSummary = computed(() => this._gameSummaryStore.summary());
    readonly isLoadingSummary = computed(() => this._gameSummaryStore.status() === LoadingStatus.LOADING);
    readonly isSummaryError = computed(() => this._gameSummaryStore.status() === LoadingStatus.ERROR);
    readonly hasLoadedSummary = computed(() => this._gameSummaryStore.status() === LoadingStatus.FULLY_LOADED);

    readonly trophies = computed(() => this._gameTrophiesStore.trophies());
    readonly isLoadingTrophies = computed(() => this._gameTrophiesStore.status() === LoadingStatus.LOADING);
    readonly isTrophiesError = computed(() => this._gameTrophiesStore.status() === LoadingStatus.ERROR);
    readonly hasLoadedTrophies = computed(() => this._gameTrophiesStore.status() === LoadingStatus.FULLY_LOADED);

    readonly hasPlayerData = computed(() => this.playerId !== null);

    ngOnInit(): void {
        this._gameSummaryStore.reset();
        this.retrieveSummary();
        this._gameTrophiesStore.reset();
        this.retrieveTrophies();
    }

    retrieveSummary(): void {
        this._gameSummaryStore.retrieve(this.gameId);
    }

    retrieveTrophies(): void {
        if (this.playerId !== null) {
            this._gameTrophiesStore.retrieveForPlayer(this.gameId, this.playerId);
        } else {
            this._gameTrophiesStore.retrieveForGame(this.gameId);
        }
    }

    toggleShowHiddenTrophies($event: boolean): void {
        this.trophyFilters.update(f => ({...f, showHidden: $event}));
    }

    toggleEarnedFilter($event: 'all' | 'earned' | 'notEarned'): void {
        this.trophyFilters.update(f => ({...f, earned: $event}));
    }
}
