import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {HomeGameStoreService} from './home-game-store.service';
import {GameService} from "../../services/http/game.service";
import {of} from "rxjs";
import {RecentlyPlayedGame} from "../../models/dto/recently-played-game";

describe('HomeGameStoreService', () => {
    let store: HomeGameStoreService;

    let gameServiceSpy: jasmine.SpyObj<GameService>;

    const mockRecentGames: RecentlyPlayedGame[] = [
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
        gameServiceSpy = jasmine.createSpyObj('GameService', ['searchRecentGames']);
        TestBed.configureTestingModule({
            providers: [{provide: GameService, useValue: gameServiceSpy}]
        });
        store = TestBed.inject(HomeGameStoreService);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });

    it('should update games when fetch is called', fakeAsync(() => {
        gameServiceSpy.searchRecentGames.and.returnValue(of(mockRecentGames));

        store.fetch();
        flushMicrotasks();

        expect(gameServiceSpy.searchRecentGames).toHaveBeenCalled();
        expect(store.games()).toEqual(mockRecentGames);
        expect(store.isLoading()).toBeFalse();
        expect(store.isError()).toBeFalse();
    }));
});
