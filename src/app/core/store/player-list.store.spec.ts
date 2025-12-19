import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {PlayerListStore} from './player-list-store';
import {PlayerService} from '../services/http/player.service';
import {of} from 'rxjs';
import {Player} from '../models/dto/player';
import {SearchResult} from '../models/dto/search-result';
import {TrophyCount} from '../models/dto/trophy-count';
import {PlayerSummary} from '../models/dto/player-summary';

describe('PlayerListStore', () => {
    let store: PlayerListStore;

    let playerServiceSpy: jasmine.SpyObj<PlayerService>;

    const mockPlayer: Player = {id: '123', pseudo: 'John Doe', avatarUrl: 'avatar.png'};
    const mockTrophyCount: TrophyCount = {platinum: 1, gold: 2, silver: 3, bronze: 4};
    const mockPlayerSummary: PlayerSummary = {
        player: mockPlayer,
        trophyCount: mockTrophyCount,
        totalGamesPlayed: 100,
        lastPlayedGameId: '',
        lastPlayedGameTitle: '',
        lastPlayedGameImageUrl: '',
    }
    const mockSearchResult: SearchResult<PlayerSummary> = {content: [mockPlayerSummary], total: 10}

    beforeEach(() => {
        playerServiceSpy = jasmine.createSpyObj<PlayerService>('PlayerService', ['search', 'count']);
        TestBed.configureTestingModule({
            providers: [
                {provide: PlayerService, useValue: playerServiceSpy},
            ]
        });
        store = TestBed.inject(PlayerListStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });

    it('should reset state when reset is called', fakeAsync(() => {
        store.reset();

        expect(store.playerSummaries()).toEqual([]);
    }));

    it('should update player list when search succeeds', fakeAsync(() => {
        playerServiceSpy.search.and.returnValue(of(mockSearchResult));

        store.search();
        flushMicrotasks();

        expect(playerServiceSpy.search).toHaveBeenCalled();
        expect(store.playerSummaries()).toEqual([mockPlayerSummary]);
    }));


});
