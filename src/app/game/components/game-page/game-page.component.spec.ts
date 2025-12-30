import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GamePageComponent} from './game-page.component';
import {ActivatedRoute} from '@angular/router';
import {GameSummaryStore} from "../../stores/game-summary-store.service";
import {GameTrophiesStore} from "../../stores/game-trophies-store.service";
import {GameSummaryComponent} from "../game-summary/game-summary.component";
import {GameTrophyFiltersComponent} from "../game-trophy-filters/game-trophy-filters.component";
import {GameTrophyCardComponent} from "../game-trophy-card/game-trophy-card.component";

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
        gameSummaryStoreSpy = jasmine.createSpyObj('GameSummaryStore', ['reset', 'retrieve', 'summary', 'status']);
        gameTrophiesStoreSpy = jasmine.createSpyObj('GameTrophiesStore', ['reset', 'retrieveForPlayer', 'retrieveForGame', 'trophies', 'status']);

        routeParamMap.set('gameId', gameId);
        routeQueryParamMap.set('playerId', playerId);

        await TestBed.configureTestingModule({
            imports: [GamePageComponent, GameSummaryComponent, GameTrophyFiltersComponent, GameTrophyCardComponent],
            providers: [
                {provide: GameSummaryStore, useValue: gameSummaryStoreSpy},
                {provide: GameTrophiesStore, useValue: gameTrophiesStoreSpy},
                {
                    provide: ActivatedRoute,
                    useValue: {snapshot: {paramMap: routeParamMap, queryParamMap: routeQueryParamMap}}
                }
            ]
        }).compileComponents();

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
