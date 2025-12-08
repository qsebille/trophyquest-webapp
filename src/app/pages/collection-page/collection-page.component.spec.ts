import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CollectionPageComponent} from './collection-page.component';
import {ActivatedRoute} from '@angular/router';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Trophy} from '../../core/models/dto/trophy';
import {CollectionStore} from "../../core/store/collection/collection.store";
import {CollectionTrophiesStore} from "../../core/store/collection/collection-trophies.store";
import {Collection} from "../../core/models/dto/collection";

describe('CollectionPageComponent', () => {
    let component: CollectionPageComponent;
    let fixture: ComponentFixture<CollectionPageComponent>;

    let collectionStoreSpy: jasmine.SpyObj<CollectionStore>;
    let collectionTrophiesStoreSpy: jasmine.SpyObj<CollectionTrophiesStore>;


    @Component({selector: 'app-collection-summary', template: ''})
    class MockCollectionSummaryComponent {
        @Input({required: true}) collection: Collection | undefined;
    }

    @Component({selector: 'app-trophy-card', template: ''})
    class MockTrophyCardComponent {
        @Input({required: true}) trophy: Trophy | undefined
        @Input({required: false}) imageSize: number = 50
        @Input({required: false}) showHiddenTrophies: boolean = false
    }

    @Component({selector: 'app-trophy-filters', template: ''})
    class MockTrophyFiltersComponent {
        @Input({required: false}) public initEarnedFilter: 'all' | 'earned' | 'notEarned' = 'all';
        @Output() public readonly showHiddenTrophies = new EventEmitter<boolean>();
        @Output() public readonly trophyEarnedFilterChanged = new EventEmitter<'all' | 'earned' | 'unearned'>();
    }

    const collectionId = 'collection-000';
    const playerId = 'player-000';

    const routeParamMap: Map<string, string> = new Map<string, string>();
    const routeQueryParamMap: Map<string, string> = new Map<string, string>();

    beforeEach(async () => {
        collectionStoreSpy = jasmine.createSpyObj('CollectionStore', ['reset', 'retrieve', 'collection', 'isLoaded', 'isLoading', 'isError']);
        collectionTrophiesStoreSpy = jasmine.createSpyObj('CollectionTrophiesStore', ['reset', 'retrieve', 'changeEarnedFilter', 'earnedFilter', 'displayedTrophies', 'baseGameTrophies', 'dlcs', 'isLoaded', 'isLoading', 'isError']);

        routeParamMap.set('collectionId', collectionId);
        routeQueryParamMap.set('playerId', playerId);

        await TestBed.configureTestingModule({
            imports: [CollectionPageComponent, MockCollectionSummaryComponent, MockTrophyFiltersComponent, MockTrophyCardComponent],
            providers: [
                {provide: CollectionStore, useValue: collectionStoreSpy},
                {provide: CollectionTrophiesStore, useValue: collectionTrophiesStoreSpy},
                {
                    provide: ActivatedRoute,
                    useValue: {snapshot: {paramMap: routeParamMap, queryParamMap: routeQueryParamMap}}
                }
            ]
        })
            .compileComponents();

        TestBed.overrideComponent(CollectionPageComponent, {
            set: {imports: [MockCollectionSummaryComponent, MockTrophyFiltersComponent, MockTrophyCardComponent]}
        });

        fixture = TestBed.createComponent(CollectionPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })
    ;

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should read params id from query parameters', () => {
        expect(component.playerId).toEqual(playerId);
        expect(component.collectionId).toEqual(collectionId);
    });

});
