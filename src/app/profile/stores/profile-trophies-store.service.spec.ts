import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {ProfileTrophiesStore} from './profile-trophies-store.service';
import {PlayerService} from "../../core/services/http/player.service";
import {SearchResult} from "../../core/models/dto/search-result";
import {Trophy} from "../../core/models/dto/trophy";
import {of} from "rxjs";
import {LoadingStatus} from "../../core/models/loading-status.enum";

describe('ProfileTrophiesStore', () => {
    let store: ProfileTrophiesStore;

    let playerServiceSpy: jasmine.SpyObj<PlayerService>;

    const mockPlayerId = 'player-123';
    const mockTrophy: Trophy = {
        id: 'trophy-1',
        trophyTitle: 'Trophy 1',
        trophyDescription: 'desc',
        trophyType: 'gold',
        iconUrl: 'img.png',
        isHidden: false,
        gameTitle: 'Game',
        gameGroup: 'default',
        earnedDate: null,
    }
    const mockSearchResult: SearchResult<Trophy> = {
        content: [mockTrophy],
        total: 2
    }

    beforeEach(() => {
        playerServiceSpy = jasmine.createSpyObj('PlayerService', ['searchEarnedTrophies']);
        TestBed.configureTestingModule({
            providers: [{provide: PlayerService, useValue: playerServiceSpy}]
        });
        store = TestBed.inject(ProfileTrophiesStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
        expect(store.status()).toEqual(LoadingStatus.NONE);
    });

    it('should search for earned trophies', fakeAsync(() => {
        playerServiceSpy.searchEarnedTrophies.and.returnValue(of(mockSearchResult));

        store.searchTrophies(mockPlayerId);
        flushMicrotasks();

        expect(playerServiceSpy.searchEarnedTrophies).toHaveBeenCalledWith(mockPlayerId, 0, 20);
        expect(store.trophies()).toEqual(mockSearchResult.content);
        expect(store.status()).toEqual(LoadingStatus.PARTIALLY_LOADED);
    }));
});
