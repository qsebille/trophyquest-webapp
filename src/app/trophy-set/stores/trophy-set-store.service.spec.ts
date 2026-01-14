import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {TrophySetStore} from './trophy-set-store.service';
import {TrophySetHttpService} from "../../core/api/services/trophy-set-http.service";
import {EarnedTrophy} from "../../core/api/dtos/trophy/earned-trophy";
import {TrophySet} from "../../core/api/dtos/trophy-set/trophy-set";
import {of} from "rxjs";
import {LoadingStatus} from "../../core/models/loading-status.enum";

describe('TrophySetStore', () => {
    let store: TrophySetStore;

    let trophySetHttpServiceSpy: jasmine.SpyObj<TrophySetHttpService>;

    beforeEach(() => {
        trophySetHttpServiceSpy = jasmine.createSpyObj('TrophySetHttpService', ['fetch', 'fetchTrophies']);

        TestBed.configureTestingModule({
            providers: [{provide: TrophySetHttpService, useValue: trophySetHttpServiceSpy}]
        });
        store = TestBed.inject(TrophySetStore);
    });

    it('should be created', () => expect(store).toBeTruthy());

    it('should update trophy set when fetched from backend', fakeAsync(() => {
        const mockTrophySetId = 'trophy-set-1';
        const mockPlayerId = 'player-1';
        const mockTrophySet = {id: mockTrophySetId, title: 'Trophy set 1'} as TrophySet;
        const mockTrophies = [
            {id: 'trophy-1', title: 'Trophy 1'} as EarnedTrophy,
        ];
        trophySetHttpServiceSpy.fetch.and.returnValue(of(mockTrophySet));
        trophySetHttpServiceSpy.fetchTrophies.and.returnValue(of(mockTrophies));

        store.retrieve(mockTrophySetId, mockPlayerId);
        flushMicrotasks();

        expect(trophySetHttpServiceSpy.fetch).toHaveBeenCalledOnceWith(mockTrophySetId);
        expect(trophySetHttpServiceSpy.fetchTrophies).toHaveBeenCalledOnceWith(mockTrophySetId, mockPlayerId);
        expect(store.trophySet()).toEqual(mockTrophySet);
        expect(store.trophies()).toEqual(mockTrophies);
        expect(store.status()).toEqual(LoadingStatus.FULLY_LOADED);
    }));
});
