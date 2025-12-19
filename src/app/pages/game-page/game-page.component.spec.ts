import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GamePageComponent} from './game-page.component';
import {ActivatedRoute} from '@angular/router';
import {Component, input, output} from '@angular/core';
import {Trophy} from '../../core/models/dto/trophy';
import {GameSummaryStore} from "../../core/store/game/game-summary-store.service";
import {GameTrophiesStore} from "../../core/store/game/game-trophies-store.service";
import {GameSummary} from "../../core/models/dto/game-summary";

describe('GamePageComponent', () => {
    let component: GamePageComponent;
    let fixture: ComponentFixture<GamePageComponent>;

    let gameSummaryStoreSpy: jasmine.SpyObj<GameSummaryStore>;
    let gameTrophiesStoreSpy: jasmine.SpyObj<GameTrophiesStore>;


    @Component({selector: 'app-game-summary', template: ''})
    class MockGameSummaryComponent {
        readonly gameSummary = input.required<GameSummary>();
    }

    @Component({selector: 'app-trophy-card', template: ''})
    class MockTrophyCardComponent {
        readonly trophy = input.required<Trophy>();
        readonly imageSize = input<number>(50);
        readonly showHiddenTrophies = input<boolean>(false);
    }

    @Component({selector: 'app-trophy-filters', template: ''})
    class MockTrophyFiltersComponent {
        readonly filter = input<'all' | 'earned' | 'notEarned'>('all');
        readonly filterChange = output<'all' | 'earned' | 'notEarned'>();
        readonly showHiddenTrophyChange = output<boolean>();
    }

    const gameId = 'game-000';
    const playerId = 'player-000';

    const routeParamMap: Map<string, string> = new Map<string, string>();
    const routeQueryParamMap: Map<string, string> = new Map<string, string>();

    beforeEach(async () => {
        gameSummaryStoreSpy = jasmine.createSpyObj('GameSummaryStore', ['reset', 'retrieve', 'gameSummary', 'isLoading', 'isError']);
        gameTrophiesStoreSpy = jasmine.createSpyObj('GameTrophiesStore', ['reset', 'retrieve', 'changeEarnedFilter', 'earnedFilter', 'displayedTrophies', 'baseGameTrophies', 'dlcs', 'isLoading', 'isError']);

        routeParamMap.set('gameId', gameId);
        routeQueryParamMap.set('playerId', playerId);

        await TestBed.configureTestingModule({
            imports: [GamePageComponent, MockGameSummaryComponent, MockTrophyFiltersComponent, MockTrophyCardComponent],
            providers: [
                {provide: GameSummaryStore, useValue: gameSummaryStoreSpy},
                {provide: GameTrophiesStore, useValue: gameTrophiesStoreSpy},
                {
                    provide: ActivatedRoute,
                    useValue: {snapshot: {paramMap: routeParamMap, queryParamMap: routeQueryParamMap}}
                }
            ]
        })
            .compileComponents();

        TestBed.overrideComponent(GamePageComponent, {
            set: {imports: [MockGameSummaryComponent, MockTrophyFiltersComponent, MockTrophyCardComponent]}
        });

        fixture = TestBed.createComponent(GamePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })
    ;

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should read params id from query parameters', () => {
        expect(component.playerId).toEqual(playerId);
        expect(component.gameId).toEqual(gameId);
    });

});
