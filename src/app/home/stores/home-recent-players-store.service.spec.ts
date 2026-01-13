import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {HomeRecentPlayersStore} from './home-recent-players-store.service';
import {PlayerHttpService} from "../../core/api/services/player-http.service";
import {RecentPlayerTrophies} from "../../core/api/dtos/player/recent-player-trophies";
import {Player} from "../../core/api/dtos/player/player";
import {EarnedTrophy} from "../../core/api/dtos/trophy/earned-trophy";
import {of} from "rxjs";
import {LoadingStatus} from "../../core/models/loading-status.enum";

describe('HomeRecentPlayersStore', () => {
    let store: HomeRecentPlayersStore;

    let playerHttpServiceSpy: jasmine.SpyObj<PlayerHttpService>;

    beforeEach(() => {
        playerHttpServiceSpy = jasmine.createSpyObj('PlayerHttpService', ['fetchTopRecent']);

        TestBed.configureTestingModule({
            providers: [{provide: PlayerHttpService, useValue: playerHttpServiceSpy}]
        });
        store = TestBed.inject(HomeRecentPlayersStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
        expect(store.players()).toEqual([]);
        expect(store.status()).toEqual(LoadingStatus.NONE);
    });

    it('should set top players when fetched from backend', fakeAsync(() => {
        const mockResult = [
            {
                player: {id: 'player-1', pseudo: 'John Doe'} as Player,
                lastTrophies: [
                    {id: 'trophy-1', title: 'Trophy 1'} as EarnedTrophy
                ],
                recentTrophyCount: 100,
            } as RecentPlayerTrophies,
        ];
        playerHttpServiceSpy.fetchTopRecent.and.returnValue(of(mockResult));

        store.fetch();
        flushMicrotasks();

        expect(playerHttpServiceSpy.fetchTopRecent).toHaveBeenCalledTimes(1);
        expect(store.players()).toEqual(mockResult);
        expect(store.status()).toEqual(LoadingStatus.FULLY_LOADED);
    }));
});
