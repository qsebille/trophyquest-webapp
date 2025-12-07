import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {ProfileStore} from './profile-store';
import {PlayerService} from '../services/player.service';
import {ErrorService} from '../services/error.service';
import {Player} from '../models/dto/player';
import {TrophyCount} from '../models/dto/trophy-count';
import {PlayerGameAchievements} from '../models/dto/player-game-achievements';
import {Trophy} from '../models/dto/trophy';
import {SearchResult} from '../models/dto/search-result';

describe('ProfileStore', () => {
  let store: ProfileStore;
  let playerServiceSpy: jasmine.SpyObj<PlayerService>;
  let errorServiceSpy: jasmine.SpyObj<ErrorService>;

  const mockPlayer: Player = {id: '123', pseudo: 'Player 123', avatarUrl: 'avatar.png'};
  const mockTrophyCount: TrophyCount = {platinum: 1, gold: 2, silver: 3, bronze: 4};
  const mockGames: PlayerGameAchievements[] = [
    {
      id: 'game-1',
      title: 'Game 1',
      imageUrl: 'img.png',
      earnedTrophies: mockTrophyCount,
      totalTrophies: mockTrophyCount,
      trophyCollections: []
    }
  ];
  const mockGameSearchResult: SearchResult<PlayerGameAchievements> = {content: mockGames, total: 10}
  const mockTrophies: Trophy[] = [
    {
      id: 'trophy-1',
      trophyTitle: 'Trophy 1',
      trophyDescription: 'desc',
      trophyType: 'gold',
      iconUrl: 'img.png',
      isHidden: false,
      gameTitle: 'Game 1',
      earnedDate: new Date().toISOString()
    }
  ];
  const mockTrophySearchResult: SearchResult<Trophy> = {content: mockTrophies, total: 10}

  beforeEach(() => {
    playerServiceSpy = jasmine.createSpyObj<PlayerService>('PlayerService', ['retrieve', 'searchGames', 'countEarnedTrophies', 'searchEarnedTrophies']);
    errorServiceSpy = jasmine.createSpyObj<ErrorService>('ErrorService', ['logErrorAndRedirect']);

    TestBed.configureTestingModule({
      providers: [
        {provide: PlayerService, useValue: playerServiceSpy},
        {provide: ErrorService, useValue: errorServiceSpy}
      ]
    });
    store = TestBed.inject(ProfileStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should reset state when reset is called', () => {
    store.reset();

    expect(store.player()).toBeUndefined();
    expect(store.collections()).toEqual([]);
    expect(store.trophies()).toEqual([]);
  });

  it('should fetch player and trophy count when fetch is called', fakeAsync(() => {
    playerServiceSpy.retrieve.and.returnValue(of(mockPlayer));
    playerServiceSpy.countEarnedTrophies.and.returnValue(of(mockTrophyCount));

    store.retrieve('123');
    flushMicrotasks();

    expect(playerServiceSpy.retrieve).toHaveBeenCalledWith('123');
    expect(playerServiceSpy.countEarnedTrophies).toHaveBeenCalledWith('123');
    expect(store.player()).toEqual(mockPlayer);
    expect(store.trophyCount()).toEqual(mockTrophyCount);
  }))

  it('should log an error when fetching player with an invalid id', () => {
    store.retrieve(null);

    expect(errorServiceSpy.logErrorAndRedirect).toHaveBeenCalledWith('Invalid player id');
    expect(playerServiceSpy.retrieve).not.toHaveBeenCalled();
  });

  it('should fetch games when searchGames is called', fakeAsync(() => {
    playerServiceSpy.searchGames.and.returnValue(of(mockGameSearchResult));

    store.searchCollections('123');
    flushMicrotasks();

    expect(playerServiceSpy.searchGames).toHaveBeenCalledWith('123', 0, 20);
    expect(store.collections()).toEqual(mockGameSearchResult.content);
    expect(store.isLoadingCollections()).toBeFalse();
    expect(store.hasMoreCollections()).toBeTrue();
  }));

  it('should search for games when loadMoreGames is called', fakeAsync(() => {
    playerServiceSpy.searchGames.and.returnValue(of(mockGameSearchResult));

    store.loadMoreCollections('123');
    flushMicrotasks();

    expect(playerServiceSpy.searchGames).toHaveBeenCalledWith('123', 1, 20);
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
