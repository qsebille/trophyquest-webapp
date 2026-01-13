import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {ProfileSummaryStore} from './profile-summary-store.service';
import {PlayerHttpService} from "../../core/api/services/player-http.service";
import {EMPTY_PLAYER, Player} from "../../core/api/dtos/player/player";
import {of} from "rxjs";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {PlayerStats} from "../../core/api/dtos/player/player-stats";

describe('ProfileSummaryStore', () => {
    let store: ProfileSummaryStore;

    let playerHttpServiceSpy: jasmine.SpyObj<PlayerHttpService>;

    beforeEach(() => {
        playerHttpServiceSpy = jasmine.createSpyObj('PlayerHttpService', ['fetch', 'fetchStats']);
        TestBed.configureTestingModule({
            providers: [{provide: PlayerHttpService, useValue: playerHttpServiceSpy}]
        });
        store = TestBed.inject(ProfileSummaryStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
        expect(store.player()).toEqual(EMPTY_PLAYER);
        expect(store.status()).toEqual(LoadingStatus.NONE);
    });

    it('should load player summary when retrieve is called', fakeAsync(() => {
        const mockPlayerId = 'player-123';
        const mockPlayer: Player = {id: mockPlayerId, pseudo: 'John Doe', avatar: 'avatar.png'};
        const mockPlayerStats: PlayerStats = {
            totalTrophySetsPlayed: 1,
            totalPlatinumTrophies: 2,
            totalGoldTrophies: 3,
            totalSilverTrophies: 4,
            totalBronzeTrophies: 5
        };

        playerHttpServiceSpy.fetch.and.returnValue(of(mockPlayer));
        playerHttpServiceSpy.fetchStats.and.returnValue(of(mockPlayerStats));

        store.retrieve(mockPlayerId);
        flushMicrotasks();

        expect(store.player()).toEqual(mockPlayer);
        expect(store.playerStats()).toEqual(mockPlayerStats);
        expect(store.status()).toEqual(LoadingStatus.FULLY_LOADED);
    }));
});
