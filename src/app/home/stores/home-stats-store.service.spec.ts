import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {HomeStatsStore} from './home-stats-store.service';
import {PlayerHttpService} from "../../core/api/services/player-http.service";
import {TrophySetHttpService} from "../../core/api/services/trophy-set-http.service";
import {TrophyHttpService} from "../../core/api/services/trophy-http.service";
import {of} from "rxjs";
import {LoadingStatus} from "../../core/models/loading-status.enum";

describe('HomeStatsStore', () => {
    let store: HomeStatsStore;

    let playerHttpServiceSpy: jasmine.SpyObj<PlayerHttpService>;
    let trophySetHttpServiceSpy: jasmine.SpyObj<TrophySetHttpService>;
    let trophyHttpServiceSpy: jasmine.SpyObj<TrophyHttpService>;

    beforeEach(() => {
        playerHttpServiceSpy = jasmine.createSpyObj('PlayerHttpService', ['count', 'countRecent']);
        trophySetHttpServiceSpy = jasmine.createSpyObj('TrophySetHttpService', ['count', 'countRecent']);
        trophyHttpServiceSpy = jasmine.createSpyObj('TrophyHttpService', ['count', 'countRecentlyEarned']);

        TestBed.configureTestingModule({
            providers: [
                {provide: PlayerHttpService, useValue: playerHttpServiceSpy},
                {provide: TrophySetHttpService, useValue: trophySetHttpServiceSpy},
                {provide: TrophyHttpService, useValue: trophyHttpServiceSpy},
            ]
        });
        store = TestBed.inject(HomeStatsStore);
    });

    it('should be created', () => expect(store).toBeTruthy());

    it('should update stats when fetched from backend', fakeAsync(() => {
        playerHttpServiceSpy.count.and.returnValue(of(10));
        playerHttpServiceSpy.countRecent.and.returnValue(of(5));
        trophySetHttpServiceSpy.count.and.returnValue(of(100));
        trophySetHttpServiceSpy.countRecent.and.returnValue(of(50));
        trophyHttpServiceSpy.count.and.returnValue(of(1000));
        trophyHttpServiceSpy.countRecentlyEarned.and.returnValue(of(500));

        store.retrieve();
        flushMicrotasks();

        expect(playerHttpServiceSpy.countRecent).toHaveBeenCalled();
        expect(playerHttpServiceSpy.count).toHaveBeenCalled();
        expect(trophySetHttpServiceSpy.count).toHaveBeenCalled();
        expect(trophySetHttpServiceSpy.countRecent).toHaveBeenCalled();
        expect(trophyHttpServiceSpy.count).toHaveBeenCalled();
        expect(trophyHttpServiceSpy.countRecentlyEarned).toHaveBeenCalled();

        expect(store.status()).toEqual(LoadingStatus.FULLY_LOADED);
        expect(store.playerCount()).toEqual(10);
        expect(store.recentPlayerCount()).toEqual(5);
        expect(store.trophySetCount()).toEqual(100);
        expect(store.recentTrophySetCount()).toEqual(50);
        expect(store.trophyCount()).toEqual(1000);
        expect(store.recentTrophyCount()).toEqual(500);
    }));
});
