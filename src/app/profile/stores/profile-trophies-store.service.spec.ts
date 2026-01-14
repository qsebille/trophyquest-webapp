import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {ProfileTrophiesStore} from './profile-trophies-store.service';
import {PlayerHttpService} from "../../core/api/services/player-http.service";
import {SearchResult} from "../../core/api/dtos/search-result";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {EarnedTrophySearchItem} from "../../core/api/dtos/trophy/earned-trophy-search-item";
import {of} from "rxjs";

describe('ProfileTrophiesStore', () => {
    let store: ProfileTrophiesStore;

    let playerHttpServiceSpy: jasmine.SpyObj<PlayerHttpService>;

    beforeEach(() => {
        playerHttpServiceSpy = jasmine.createSpyObj('PlayerService', ['searchEarnedTrophies']);
        TestBed.configureTestingModule({
            providers: [{provide: PlayerHttpService, useValue: playerHttpServiceSpy}]
        });
        store = TestBed.inject(ProfileTrophiesStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
        expect(store.status()).toEqual(LoadingStatus.NONE);
    });

    it('should search for player trophies', fakeAsync(() => {
        const mockPlayerId = 'player-123';
        const mockSearchResult: SearchResult<EarnedTrophySearchItem> = {
            content: [
                {id: 'trophy-1', title: 'Trophy 1'} as EarnedTrophySearchItem,
                {id: 'trophy-2', title: 'Trophy 2'} as EarnedTrophySearchItem,
            ],
            total: 10
        };
        playerHttpServiceSpy.searchEarnedTrophies.and.returnValue(of(mockSearchResult));

        store.search(mockPlayerId);
        flushMicrotasks();

        expect(playerHttpServiceSpy.searchEarnedTrophies).toHaveBeenCalledWith(mockPlayerId, 0, 20)
        expect(store.status()).toEqual(LoadingStatus.PARTIALLY_LOADED);
        expect(store.trophies()).toEqual(mockSearchResult.content);
    }));
});
