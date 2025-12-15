import {TestBed} from '@angular/core/testing';

import {GameListStore} from './game-list-store';
import {GameService} from '../services/game.service';
import {of} from "rxjs";
import {SearchResult} from "../models/dto/search-result";
import {Game} from "../models/dto/game";

describe('GameListStore', () => {
    let store: GameListStore;

    let gameServiceSpy: jasmine.SpyObj<GameService>;

    const mockSearchResult: SearchResult<Game> = {
        content: [
            {id: 'game-1', title: 'Game 1', imageUrl: 'game-1.png'} as Game,
            {id: 'game-2', title: 'Game 2', imageUrl: 'game-2.png'} as Game,
        ],
        total: 2,
    };

    beforeEach(() => {
        gameServiceSpy = jasmine.createSpyObj<GameService>('GameService', ['searchRecentGames']);
        TestBed.configureTestingModule({
            providers: [
                {provide: GameService, useValue: gameServiceSpy},
            ]
        });
        store = TestBed.inject(GameListStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });

    it('should call game service when searching recent games', () => {
        gameServiceSpy.searchRecentGames.and.returnValue(of(mockSearchResult));

        store.searchRecentlyPlayedGames()

        expect(store.isLoading()).toBeFalse();
        expect(store.total()).toEqual(2);
        expect(store.results()).toEqual(mockSearchResult.content);
        expect(store.hasMoreGames()).toBeFalse()

    })
});
