import {Component, computed} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameSummaryStore} from '../../core/store/game/game-summary-store.service';
import {GameTrophiesStore} from '../../core/store/game/game-trophies-store.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TrophyFiltersComponent} from '../../components/trophy-filters/trophy-filters.component';
import {GameSummaryComponent} from "../../components/game-summary/game-summary.component";
import {GameTrophyCardComponent} from "../../components/game-trophy-card/game-trophy-card.component";

@Component({
    selector: 'app-game-page',
    imports: [
        MatProgressSpinnerModule,
        TrophyFiltersComponent,
        GameSummaryComponent,
        GameTrophyCardComponent,
    ],
    templateUrl: './game-page.component.html',
    styleUrl: './game-page.component.scss',
})
export class GamePageComponent {
    gameId: string | null;
    playerId: string | null;

    shouldShowHiddenTrophies: boolean = false;

    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _gameSummaryStore: GameSummaryStore,
        private readonly _gameTrophiesStore: GameTrophiesStore,
    ) {
        this.gameId = this._route.snapshot.paramMap.get('gameId');
        this.playerId = this._route.snapshot.queryParamMap.get('playerId');
    }

    readonly gameSummary = computed(() => this._gameSummaryStore.summary());
    readonly isLoadingSummary = computed(() => this._gameSummaryStore.isLoading());
    readonly isSummaryError = computed(() => this._gameSummaryStore.isError());

    readonly baseGameTrophies = computed(() => this._gameTrophiesStore.baseGameTrophies());
    readonly dlcs = computed(() => this._gameTrophiesStore.dlcs());
    readonly isLoadingTrophies = computed(() => this._gameTrophiesStore.isLoading());
    readonly isTrophiesError = computed(() => this._gameTrophiesStore.isError());
    readonly earnedFilter = computed(() => this._gameTrophiesStore.earnedFilter());


    ngOnInit(): void {
        this._gameSummaryStore.reset();
        this._gameSummaryStore.retrieve(this.gameId);
        this._gameTrophiesStore.reset();
        this._gameTrophiesStore.retrieve(this.gameId, this.playerId);
    }

    retrieveSummary(): void {
        this._gameSummaryStore.retrieve(this.gameId);
    }

    retrieveTrophies(): void {
        this._gameTrophiesStore.retrieve(this.gameId, this.playerId);
    }

    showHiddenTrophies($event: boolean): void {
        this.shouldShowHiddenTrophies = $event;
    }

    changeTrophyEarnedType($event: 'all' | 'earned' | 'notEarned'): void {
        this._gameTrophiesStore.changeEarnedFilter($event);
    }

}
