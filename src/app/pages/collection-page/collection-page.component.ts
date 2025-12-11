import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CollectionSummaryComponent} from '../../components/collection-summary/collection-summary.component';
import {CollectionStore} from '../../core/store/collection/collection.store';
import {CollectionTrophiesStore} from '../../core/store/collection/collection-trophies.store';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TrophyFiltersComponent} from '../../components/trophy-filters/trophy-filters.component';
import {CollectionTrophyCardComponent} from "../../components/collection-trophy-card/collection-trophy-card.component";

@Component({
    selector: 'app-game-page',
    imports: [
        CollectionSummaryComponent,
        CollectionTrophyCardComponent,
        MatProgressSpinnerModule,
        TrophyFiltersComponent,
    ],
    templateUrl: './collection-page.component.html',
    styleUrl: './collection-page.component.scss',
})
export class CollectionPageComponent {
    collectionId: string | null;
    playerId: string | null;

    shouldShowHiddenTrophies: boolean = false;

    constructor(
        private readonly _route: ActivatedRoute,
        public readonly collectionStore: CollectionStore,
        public readonly collectionTrophiesStore: CollectionTrophiesStore,
    ) {
        this.collectionId = this._route.snapshot.paramMap.get('collectionId');
        this.playerId = this._route.snapshot.queryParamMap.get('playerId');
    }

    ngOnInit(): void {
        this.collectionStore.reset();
        this.collectionStore.retrieve(this.collectionId);
        this.collectionTrophiesStore.reset();
        this.collectionTrophiesStore.retrieve(this.collectionId, this.playerId);
    }

    retrieveCollection(): void {
        this.collectionStore.retrieve(this.collectionId);
    }

    retrieveTrophies(): void {
        this.collectionTrophiesStore.retrieve(this.collectionId, this.playerId);
    }

    showHiddenTrophies($event: boolean): void {
        this.shouldShowHiddenTrophies = $event;
    }

    changeTrophyEarnedType($event: 'all' | 'earned' | 'notEarned'): void {
        this.collectionTrophiesStore.changeEarnedFilter($event);
    }

}
