import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {ProfileSummaryStore} from './profile-summary-store.service';
import {PlayerService} from "../../services/http/player.service";
import {Player} from "../../models/dto/player";
import {of} from "rxjs";
import {TrophyCountPerType} from "../../models/dto/trophy-count-per-type";

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
    });

    it('should load player summary when retrieve is called', fakeAsync(() => {
        playerServiceSpy.retrieve.and.returnValue(of(mockPlayer));
        playerServiceSpy.countPlayedGames.and.returnValue(of(mockGamesPlayed));
        playerServiceSpy.getTrophyCountPerType.and.returnValue(of(mockTrophyCount));

        store.retrieve(mockPlayerId);
        flushMicrotasks();

        expect(store.player()).toEqual(mockPlayer);
        expect(store.gameCount()).toEqual(mockGamesPlayed);
        expect(store.trophyCountPerType()).toEqual(mockTrophyCount);
        expect(store.isLoading()).toBeFalse();
        expect(store.isError()).toBeFalse();
    }));
});
