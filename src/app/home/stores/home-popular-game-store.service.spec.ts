import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {HomePopularGamesStore} from './home-popular-games-store.service';
import {GameService} from "../../core/services/http/game.service";
import {of} from "rxjs";
import {PopularGame} from "../../core/models/dto/popular-game";
import {LoadingStatus} from "../../core/models/loading-status.enum";

describe('HomePopularGamesStore', () => {
    let store: HomePopularGamesStore;

    let gameServiceSpy: jasmine.SpyObj<GameService>;

    const mockRecentGames: PopularGame[] = [
        {
            id: 'game-1',
            title: 'Game 1',
            imageUrl: 'game-1.png',
            recentPlayers: 100,
        },
        {
            id: 'game-2',
            title: 'Game 2',
            imageUrl: 'game-2.png',
            recentPlayers: 50,
        },
    ];

    beforeEach(() => {
        gameServiceSpy = jasmine.createSpyObj('GameService', ['searchPopularGames']);
        TestBed.configureTestingModule({
            providers: [{provide: GameService, useValue: gameServiceSpy}]
        });
        store = TestBed.inject(HomePopularGamesStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
        expect(store.games()).toEqual([]);
        expect(store.status()).toEqual(LoadingStatus.NONE);
    });

    it('should update games when fetch is called', fakeAsync(() => {
        gameServiceSpy.searchPopularGames.and.returnValue(of(mockRecentGames));

        store.fetch();
        flushMicrotasks();

        expect(gameServiceSpy.searchPopularGames).toHaveBeenCalled();
        expect(store.games()).toEqual(mockRecentGames);
        expect(store.status()).toEqual(LoadingStatus.FULLY_LOADED);
    }));
});
