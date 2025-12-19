import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {ProfileGamesStore} from './profile-games-store.service';
import {PlayerService} from "../../services/http/player.service";
import {PlayerGame} from "../../models/dto/player-game";
import {SearchResult} from "../../models/dto/search-result";
import {of} from "rxjs";

describe('ProfileGamesStore', () => {
    let store: ProfileGamesStore;

    let playerServiceSpy: jasmine.SpyObj<PlayerService>;

    const mockPlayerId = 'player-123';
    const mockGame: PlayerGame = {
        id: 'game-1',
        title: 'Game 1',
        platform: 'PS5',
        imageUrl: 'game-1.png',
        totalTrophies: {platinum: 1, gold: 2, silver: 3, bronze: 4},
        earnedTrophies: {platinum: 1, gold: 2, silver: 3, bronze: 4},
    }
    const mockSearchResult: SearchResult<PlayerGame> = {
        content: [mockGame],
        total: 10
    }

    beforeEach(() => {
        playerServiceSpy = jasmine.createSpyObj('PlayerService', ['searchGames']);
        TestBed.configureTestingModule({
            providers: [{provide: PlayerService, useValue: playerServiceSpy}]
        });
        store = TestBed.inject(ProfileGamesStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });

    it('should search for games', fakeAsync(() => {
        playerServiceSpy.searchGames.and.returnValue(of(mockSearchResult));

        store.searchGames(mockPlayerId);
        flushMicrotasks();

        expect(playerServiceSpy.searchGames).toHaveBeenCalledWith(mockPlayerId, 0, 20);
        expect(store.games()).toEqual(mockSearchResult.content);
        expect(store.isError()).toBeFalse();
        expect(store.isLoading()).toBeFalse();
        expect(store.isPartiallyLoaded()).toBeTrue();
    }));
});
