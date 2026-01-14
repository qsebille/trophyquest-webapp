import {Component, computed, OnInit, signal} from '@angular/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {TrophySetStore} from "../../stores/trophy-set-store.service";
import {ActivatedRoute} from "@angular/router";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {TrophyFilters} from "../../../core/models/filters/trophy-filters";
import {TrophySetSummaryComponent} from "../trophy-set-summary/trophy-set-summary.component";
import {TrophySetTrophyListComponent} from "../trophy-set-trophy-list/trophy-set-trophy-list.component";
import {TrophySetTrophyFiltersComponent} from "../trophy-set-trophy-filters/trophy-set-trophy-filters.component";

@Component({
    selector: 'tq-trophy-set-page',
    imports: [
        MatProgressSpinnerModule,
        ErrorMessageComponent,
        TrophySetSummaryComponent,
        TrophySetTrophyListComponent,
        TrophySetTrophyFiltersComponent,
    ],
    templateUrl: './trophy-set-page.component.html',
    styleUrl: './trophy-set-page.component.scss',
})
export class TrophySetPageComponent implements OnInit {
    private readonly _trophySetId: string;
    private readonly _playerId: string | null;


    readonly trophyFilters = signal<TrophyFilters>({
        showHidden: false,
        earned: 'all',
    });

    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _trophySetStore: TrophySetStore,
    ) {
        this._trophySetId = this._route.snapshot.paramMap.get('trophySetId') ?? '';
        this._playerId = this._route.snapshot.queryParamMap.get('playerId');
    }

    readonly trophySet = computed(() => this._trophySetStore.trophySet());
    readonly trophies = computed(() => this._trophySetStore.trophies());
    readonly isLoading = computed(() => this._trophySetStore.status() === LoadingStatus.LOADING);
    readonly hasFailed = computed(() => this._trophySetStore.status() === LoadingStatus.ERROR);
    readonly hasPlayerData = computed(() => this._playerId !== null);

    ngOnInit(): void {
        this._trophySetStore.reset();
        this.loadData();
    }

    loadData(): void {
        this._trophySetStore.retrieve(this._trophySetId, this._playerId);
    }

    toggleShowHiddenTrophies($event: boolean): void {
        this.trophyFilters.update(f => ({...f, showHidden: $event}));
    }

    toggleEarnedFilter($event: 'all' | 'earned' | 'notEarned'): void {
        this.trophyFilters.update(f => ({...f, earned: $event}));
    }
}
