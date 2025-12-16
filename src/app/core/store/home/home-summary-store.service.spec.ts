import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {HomeSummaryStoreService} from './home-summary-store.service';
import {PlayerService} from "../../services/http/player.service";
import {GameService} from "../../services/http/game.service";
import {TrophyService} from "../../services/http/trophy.service";
import {of} from "rxjs";

describe('HomeSummaryStoreService', () => {
    let store: HomeSummaryStoreService;

    let playerServiceSpy: jasmine.SpyObj<PlayerService>;
    let gameServiceSpy: jasmine.SpyObj<GameService>;
    let trophyServiceSpy: jasmine.SpyObj<TrophyService>;

    beforeEach(() => {
        playerServiceSpy = jasmine.createSpyObj('PlayerService', ['count']);
        gameServiceSpy = jasmine.createSpyObj('GameService', ['count']);
        trophyServiceSpy = jasmine.createSpyObj('TrophyService', ['countObtained']);
        TestBed.configureTestingModule({
            providers: [
                {provide: PlayerService, useValue: playerServiceSpy},
                {provide: GameService, useValue: gameServiceSpy},
                {provide: TrophyService, useValue: trophyServiceSpy},
            ]
        });
        store = TestBed.inject(HomeSummaryStoreService);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });

    it('should update counts when fetch is called', fakeAsync(() => {
        playerServiceSpy.count.and.returnValue(of(3));
        gameServiceSpy.count.and.returnValue(of(2));
        trophyServiceSpy.countObtained.and.returnValue(of(1));

        store.fetch();
        flushMicrotasks();

        expect(playerServiceSpy.count).toHaveBeenCalled();
        expect(gameServiceSpy.count).toHaveBeenCalled();
        expect(trophyServiceSpy.countObtained).toHaveBeenCalled();

        expect(store.isLoading()).toBeFalse();
        expect(store.nbPlayers()).toBe(3);
        expect(store.nbGames()).toBe(2);
        expect(store.nbEarnedTrophies()).toBe(1);
    }));
});
