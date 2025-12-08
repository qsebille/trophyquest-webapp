import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {ProfileStore} from './profile-store';
import {PlayerService} from '../services/player.service';
import {Player} from '../models/dto/player';
import {TrophyCount} from '../models/dto/trophy-count';
import {Trophy} from '../models/dto/trophy';
import {SearchResult} from '../models/dto/search-result';
import {PlayerCollection} from '../models/dto/player-collection';
import {NavigatorService} from "../services/utils/navigator.service";

describe('ProfileStore', () => {
    let store: ProfileStore;
    let playerServiceSpy: jasmine.SpyObj<PlayerService>;
    let navigatorServiceSpy: jasmine.SpyObj<NavigatorService>;

    const mockPlayer: Player = {id: '123', pseudo: 'Player 123', avatarUrl: 'avatar.png'};
    const mockTrophyCount: TrophyCount = {platinum: 1, gold: 2, silver: 3, bronze: 4};
    const mockGames: PlayerCollection[] = [
        {
            collectionId: '123',
            collectionTitle: 'Collection 123',
            collectionPlatform: 'PS5',
            collectionImageUrl: 'collection-img.png',
            gameId: '001',
            gameTitle: 'Game 001',
            gameImageUrl: 'game-img.png',
            collectionTrophies: mockTrophyCount,
            earnedTrophies: mockTrophyCount,
        }
    ];
    const mockCollectionSearchResult: SearchResult<PlayerCollection> = {content: mockGames, total: 10}
    const mockTrophies: Trophy[] = [
        {
            id: 'trophy-1',
            trophyTitle: 'Trophy 1',
            trophyDescription: 'desc',
            trophyType: 'gold',
            iconUrl: 'img.png',
            isHidden: false,
            gameTitle: 'Game 1',
            gameGroup: 'default',
            earnedDate: new Date().toISOString()
        }
    ];
    const mockTrophySearchResult: SearchResult<Trophy> = {content: mockTrophies, total: 10}

    beforeEach(() => {
        playerServiceSpy = jasmine.createSpyObj<PlayerService>('PlayerService', ['retrieve', 'searchCollections', 'countPlayedGames', 'countEarnedTrophies', 'searchEarnedTrophies']);
        navigatorServiceSpy = jasmine.createSpyObj<NavigatorService>('NavigatorService', ['goToErrorPage']);

        TestBed.configureTestingModule({
            providers: [
                {provide: PlayerService, useValue: playerServiceSpy},
                {provide: NavigatorService, useValue: navigatorServiceSpy}
            ]
        });
        store = TestBed.inject(ProfileStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });

    it('should reset state when reset is called', () => {
        store.reset();

        expect(store.player()).toEqual({id: '', pseudo: '', avatarUrl: ''});
        expect(store.collections()).toEqual([]);
        expect(store.trophies()).toEqual([]);
    });

    it('should retrieve player and trophy count when retrieve is called', fakeAsync(() => {
        playerServiceSpy.retrieve.and.returnValue(of(mockPlayer));
        playerServiceSpy.countPlayedGames.and.returnValue(of(10));
        playerServiceSpy.countEarnedTrophies.and.returnValue(of(mockTrophyCount));

        store.retrieve(mockPlayer.id);
        flushMicrotasks();

        expect(playerServiceSpy.retrieve).toHaveBeenCalledWith(mockPlayer.id);
        expect(playerServiceSpy.countPlayedGames).toHaveBeenCalledWith(mockPlayer.id);
        expect(playerServiceSpy.countEarnedTrophies).toHaveBeenCalledWith(mockPlayer.id);
        expect(store.player()).toEqual(mockPlayer);
        expect(store.trophyCount()).toEqual(mockTrophyCount);
    }))

    it('should log an error when retrieving player with an invalid id', () => {
        store.retrieve(null);

        expect(navigatorServiceSpy.goToErrorPage).toHaveBeenCalledWith('Invalid player id');
        expect(playerServiceSpy.retrieve).not.toHaveBeenCalled();
    });

    it('should search collections searchCollections is called', fakeAsync(() => {
        playerServiceSpy.searchCollections.and.returnValue(of(mockCollectionSearchResult));

        store.searchCollections('123');
        flushMicrotasks();

        expect(playerServiceSpy.searchCollections).toHaveBeenCalledWith('123', 0, 20);
        expect(store.collections()).toEqual(mockCollectionSearchResult.content);
        expect(store.isLoadingCollections()).toBeFalse();
        expect(store.hasMoreCollections()).toBeTrue();
    }));

    it('should search for collections when loadMoreCollections is called', fakeAsync(() => {
        playerServiceSpy.searchCollections.and.returnValue(of(mockCollectionSearchResult));

        store.loadMoreCollections('123');
        flushMicrotasks();

        expect(playerServiceSpy.searchCollections).toHaveBeenCalledWith('123', 1, 20);
    }));

    it('should search for earned trophies when searchEarnedTrophies is called', fakeAsync(() => {
        playerServiceSpy.searchEarnedTrophies.and.returnValue(of(mockTrophySearchResult));

        store.searchTrophies('123');
        flushMicrotasks();

        expect(playerServiceSpy.searchEarnedTrophies).toHaveBeenCalledWith('123', 0, 20);
        expect(store.trophies()).toEqual(mockTrophySearchResult.content);
        expect(store.isLoadingTrophies()).toBeFalse();
        expect(store.hasMoreTrophies()).toBeTrue();
    }));

    it('should search for trophies when loadMoreTrophies is called', fakeAsync(() => {
        playerServiceSpy.searchEarnedTrophies.and.returnValue(of(mockTrophySearchResult));

        store.loadMoreTrophies('123');
        flushMicrotasks();

        expect(playerServiceSpy.searchEarnedTrophies).toHaveBeenCalledWith('123', 1, 20);
    }));
});
