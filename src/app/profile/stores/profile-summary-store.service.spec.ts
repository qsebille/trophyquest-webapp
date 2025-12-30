import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {ProfileSummaryStore} from './profile-summary-store.service';
import {PlayerService} from "../../core/services/http/player.service";
import {EMPTY_PLAYER, Player} from "../../core/models/dto/player";
import {of} from "rxjs";
import {TrophyCountPerType} from "../../core/models/dto/trophy-count-per-type";
import {LoadingStatus} from "../../core/models/loading-status.enum";

describe('ProfileSummaryStore', () => {
    let store: ProfileSummaryStore;

    let playerServiceSpy: jasmine.SpyObj<PlayerService>;

    const mockPlayerId = 'player-123';
    const mockPlayer: Player = {id: mockPlayerId, pseudo: 'John Doe', avatarUrl: 'avatar.png'};
    const mockGamesPlayed = 10;
    const mockTrophyCount: TrophyCountPerType = {platinum: 1, gold: 2, silver: 3, bronze: 4};

    beforeEach(() => {
        playerServiceSpy = jasmine.createSpyObj('PlayerService', ['retrieve', 'countPlayedGames', 'getTrophyCountPerType']);
        TestBed.configureTestingModule({
            providers: [{provide: PlayerService, useValue: playerServiceSpy}]
        });
        store = TestBed.inject(ProfileSummaryStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
        expect(store.player()).toEqual(EMPTY_PLAYER);
        expect(store.status()).toEqual(LoadingStatus.NONE);
    });

    it('should load player summary when retrieve is called', fakeAsync(() => {
        playerServiceSpy.retrieve.and.returnValue(of(mockPlayer));
        playerServiceSpy.countPlayedGames.and.returnValue(of(mockGamesPlayed));
        playerServiceSpy.getTrophyCountPerType.and.returnValue(of(mockTrophyCount));

        store.retrieve(mockPlayerId);
        flushMicrotasks();

        expect(store.player()).toEqual(mockPlayer);
        expect(store.totalGames()).toEqual(mockGamesPlayed);
        expect(store.trophyCountPerType()).toEqual(mockTrophyCount);
        expect(store.status()).toEqual(LoadingStatus.FULLY_LOADED);
    }));
});
