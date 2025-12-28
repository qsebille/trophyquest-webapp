import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GamePageComponent} from './game-page.component';
import {ActivatedRoute} from '@angular/router';
import {GameSummaryStore} from "../../core/store/game/game-summary-store.service";
import {GameTrophiesStore} from "../../core/store/game/game-trophies-store.service";
import {GameSummaryComponent} from "../../components/game-summary/game-summary.component";
import {TrophyFiltersComponent} from "../../components/trophy-filters/trophy-filters.component";
import {GameTrophyCardComponent} from "../../components/game-trophy-card/game-trophy-card.component";

describe('GamePageComponent', () => {
    let component: GamePageComponent;
    let fixture: ComponentFixture<GamePageComponent>;

    let gameSummaryStoreSpy: jasmine.SpyObj<GameSummaryStore>;
    let gameTrophiesStoreSpy: jasmine.SpyObj<GameTrophiesStore>;

    const gameId = 'game-000';
    const playerId = 'player-000';

    const routeParamMap: Map<string, string> = new Map<string, string>();
    const routeQueryParamMap: Map<string, string> = new Map<string, string>();

    beforeEach(async () => {
        gameSummaryStoreSpy = jasmine.createSpyObj('GameSummaryStore', ['reset', 'retrieve', 'summary', 'isLoading', 'isError']);
        gameTrophiesStoreSpy = jasmine.createSpyObj('GameTrophiesStore', ['reset', 'retrieveForPlayer', 'retrieveForGame', 'changeEarnedFilter', 'earnedFilter', 'displayedTrophies', 'baseGameTrophies', 'dlcs', 'isLoading', 'isError']);

        routeParamMap.set('gameId', gameId);
        routeQueryParamMap.set('playerId', playerId);

        await TestBed.configureTestingModule({
            imports: [GamePageComponent, GameSummaryComponent, TrophyFiltersComponent, GameTrophyCardComponent],
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
