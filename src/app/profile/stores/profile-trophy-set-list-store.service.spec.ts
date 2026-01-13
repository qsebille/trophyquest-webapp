import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {PlayerHttpService} from "../../core/api/services/player-http.service";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {ProfileTrophySetListStore} from "./profile-trophy-set-list-store.service";
import {of} from "rxjs";
import {PlayedTrophySetSearchElement} from "../../core/api/dtos/trophy-set/played-trophy-set-search-element";

describe('ProfileTrophySetListStore', () => {
    let store: ProfileTrophySetListStore;

    let playerHttpServiceSpy: jasmine.SpyObj<PlayerHttpService>;

    beforeEach(() => {
        playerHttpServiceSpy = jasmine.createSpyObj('PlayerHttpService', ['searchPlayedTrophySets']);
        TestBed.configureTestingModule({
            providers: [{provide: PlayerHttpService, useValue: playerHttpServiceSpy}]
        });
        store = TestBed.inject(ProfileTrophySetListStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
        expect(store.status()).toEqual(LoadingStatus.NONE);
    });

    it('should search for trophy sets played by player', fakeAsync(() => {
        const mockPlayerId = 'player-123';
        const mockSearchResult = {
            content: [
                {id: 'trophy-set-1', title: 'Trophy set 1'} as PlayedTrophySetSearchElement,
                {id: 'trophy-set-2', title: 'Trophy set 2'} as PlayedTrophySetSearchElement,
            ],
            total: 10
        };
        playerHttpServiceSpy.searchPlayedTrophySets.and.returnValue(of(mockSearchResult));

        store.search(mockPlayerId);
        flushMicrotasks();

        expect(playerHttpServiceSpy.searchPlayedTrophySets).toHaveBeenCalledWith(mockPlayerId, 0, 20)
        expect(store.status()).toEqual(LoadingStatus.PARTIALLY_LOADED);
        expect(store.trophySets()).toEqual(mockSearchResult.content);
    }));
});
