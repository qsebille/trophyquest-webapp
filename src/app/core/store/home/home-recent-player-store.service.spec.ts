import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {HomeRecentPlayerStoreService} from './home-recent-player-store.service';
import {PlayerService} from "../../services/http/player.service";
import {RecentPlayerResponse} from "../../models/dto/recent-player-response";
import {of} from "rxjs";

describe('HomeRecentPlayerStoreService', () => {
    let store: HomeRecentPlayerStoreService;

    let playerServiceSpy: jasmine.SpyObj<PlayerService>;

    const mockRecentPlayers: RecentPlayerResponse[] = [
        {
            player: {
                id: 'player-1',
                pseudo: 'Player 1',
                avatarUrl: 'player1.png',
            },
            recentTrophyCount: 10,
            lastObtainedTrophies: []
        },
        {
            player: {
                id: 'player-2',
                pseudo: 'Player 2',
                avatarUrl: 'player2.png',
            },
            recentTrophyCount: 5,
            lastObtainedTrophies: []
        }
    ];

    beforeEach(() => {
        playerServiceSpy = jasmine.createSpyObj('PlayerService', ['fetchRecentPlayers']);
        TestBed.configureTestingModule({
            providers: [{provide: PlayerService, useValue: playerServiceSpy}]
        });
        store = TestBed.inject(HomeRecentPlayerStoreService);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });

    it('should search recent players when fetch is called', fakeAsync(() => {
        playerServiceSpy.fetchRecentPlayers.and.returnValue(of(mockRecentPlayers));

        store.fetch();
        flushMicrotasks();

        expect(playerServiceSpy.fetchRecentPlayers).toHaveBeenCalled();
        expect(store.list()).toEqual(mockRecentPlayers);
        expect(store.isLoading()).toBeFalse();
        expect(store.isError()).toBeFalse();
    }));
});
