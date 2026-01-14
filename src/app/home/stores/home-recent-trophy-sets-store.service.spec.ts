import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {HomeRecentTrophySetsStore} from './home-recent-trophy-sets-store.service';
import {TrophySetHttpService} from "../../core/api/services/trophy-set-http.service";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {RecentTrophySet} from "../../core/api/dtos/trophy-set/recent-trophy-set";
import {of} from "rxjs";

describe('HomeRecentTrophySetsStore', () => {
    let store: HomeRecentTrophySetsStore;

    let trophySetHttpServiceSpy: jasmine.SpyObj<TrophySetHttpService>;

    beforeEach(() => {
        trophySetHttpServiceSpy = jasmine.createSpyObj('TrophySetHttpService', ['fetchRecent']);

        TestBed.configureTestingModule({
            providers: [{provide: TrophySetHttpService, useValue: trophySetHttpServiceSpy}]
        });
        store = TestBed.inject(HomeRecentTrophySetsStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
        expect(store.trophySets()).toEqual([]);
        expect(store.status()).toEqual(LoadingStatus.NONE);
    });

    it('should set recent trophy sets when fetched from backend', fakeAsync(() => {
        const mockResult = [
            {id: 'trophy-set-1', title: 'Trophy set 1'} as RecentTrophySet,
            {id: 'trophy-set-2', title: 'Trophy set 2'} as RecentTrophySet,
        ];
        trophySetHttpServiceSpy.fetchRecent.and.returnValue(of(mockResult));

        store.fetch();
        flushMicrotasks();

        expect(trophySetHttpServiceSpy.fetchRecent).toHaveBeenCalledTimes(1);
        expect(store.trophySets()).toEqual(mockResult);
        expect(store.status()).toEqual(LoadingStatus.FULLY_LOADED);
    }));
});
