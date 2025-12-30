import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {PlayerListStore} from './player-list-store';
import {PlayerService} from '../../core/services/http/player.service';
import {of} from 'rxjs';
import {Player} from '../../core/models/dto/player';
import {SearchResult} from '../../core/models/dto/search-result';
import {TrophyCountPerType} from '../../core/models/dto/trophy-count-per-type';
import {PlayerSummary} from '../../core/models/dto/player-summary';
import {LoadingStatus} from "../../core/models/loading-status.enum";

describe('PlayerListStore', () => {
    let store: PlayerListStore;

    let playerServiceSpy: jasmine.SpyObj<PlayerService>;

    const mockPlayer: Player = {id: '123', pseudo: 'John Doe', avatarUrl: 'avatar.png'};
    const mockTrophyCount: TrophyCountPerType = {platinum: 1, gold: 2, silver: 3, bronze: 4};
    const mockPlayerSummary: PlayerSummary = {
        player: mockPlayer,
        trophyCount: mockTrophyCount,
        totalGamesPlayed: 100,
        lastPlayedGameId: '',
        lastPlayedGameTitle: '',
        lastPlayedGamePlatform: '',
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
        expect(store.playerSummaries()).toEqual([]);
        expect(store.total()).toEqual(0);
        expect(store.status()).toEqual(LoadingStatus.NONE);
    });

    it('should reset state when reset is called', fakeAsync(() => {
        store.reset();

        expect(store.playerSummaries()).toEqual([]);
        expect(store.total()).toEqual(0);
        expect(store.status()).toEqual(LoadingStatus.NONE);
    }));

    it('should update player list when search succeeds', fakeAsync(() => {
        playerServiceSpy.search.and.returnValue(of(mockSearchResult));

        store.search();
        flushMicrotasks();

        expect(playerServiceSpy.search).toHaveBeenCalled();
        expect(store.playerSummaries()).toEqual([mockPlayerSummary]);
        expect(store.total()).toEqual(10);
        expect(store.status()).toEqual(LoadingStatus.PARTIALLY_LOADED);
    }));
});
