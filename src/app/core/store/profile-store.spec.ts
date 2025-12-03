import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {ProfileStore} from './profile-store';
import {UserService} from '../services/user.service';
import {ErrorService} from '../services/error.service';
import {User} from '../models/dto/user';
import {TrophyCount} from '../models/dto/trophy-count';
import {UserGame} from '../models/dto/user-game';
import {Trophy} from '../models/dto/trophy';
import {SearchResult} from '../models/dto/search-result';

describe('ProfileStore', () => {
  let store: ProfileStore;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let errorServiceSpy: jasmine.SpyObj<ErrorService>;

  const mockUser: User = {id: '123', profileName: 'Test User', avatarUrl: 'avatar.png'};
  const mockTrophyCount: TrophyCount = {platinum: 1, gold: 2, silver: 3, bronze: 4};
  const mockGames: UserGame[] = [
    {
      id: 'game-1',
      title: 'Game 1',
      imageUrl: 'img.png',
      earnedTrophies: mockTrophyCount,
      totalTrophies: mockTrophyCount,
      trophyCollections: []
    }
  ];
  const mockGameSearchResult: SearchResult<UserGame> = {content: mockGames, total: 10}
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
    userServiceSpy = jasmine.createSpyObj<UserService>('UserService', ['fetchUser', 'searchGames', 'getTrophyCount', 'searchEarnedTrophies']);
    errorServiceSpy = jasmine.createSpyObj<ErrorService>('ErrorService', ['logErrorAndRedirect']);

    TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useValue: userServiceSpy},
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

    expect(store.user()).toBeUndefined();
    expect(store.gameResults()).toEqual([]);
    expect(store.trophyResults()).toEqual([]);
  });

  it('should fetch user and trophy count when fetch is called', fakeAsync(() => {
    userServiceSpy.fetchUser.and.returnValue(of(mockUser));
    userServiceSpy.getTrophyCount.and.returnValue(of(mockTrophyCount));

    store.fetch('123');
    flushMicrotasks();

    expect(userServiceSpy.fetchUser).toHaveBeenCalledWith('123');
    expect(userServiceSpy.getTrophyCount).toHaveBeenCalledWith('123');
    expect(store.user()).toEqual(mockUser);
    expect(store.trophyCount()).toEqual(mockTrophyCount);
  }))

  it('should log an error when fetching user with an invalid user id', () => {
    store.fetch(null);

    expect(errorServiceSpy.logErrorAndRedirect).toHaveBeenCalledWith('Invalid user id');
    expect(userServiceSpy.fetchUser).not.toHaveBeenCalled();
  });

  it('should fetch games when searchGames is called', fakeAsync(() => {
    userServiceSpy.searchGames.and.returnValue(of(mockGameSearchResult));

    store.searchGames('123');
    flushMicrotasks();

    expect(userServiceSpy.searchGames).toHaveBeenCalledWith('123', 0, 20);
    expect(store.gameResults()).toEqual(mockGameSearchResult.content);
    expect(store.isLoadingGames()).toBeFalse();
    expect(store.hasMoreGames()).toBeTrue();
  }));

  it('should search for games when loadMoreGames is called', fakeAsync(() => {
    userServiceSpy.searchGames.and.returnValue(of(mockGameSearchResult));

    store.loadMoreGames('123');
    flushMicrotasks();

    expect(userServiceSpy.searchGames).toHaveBeenCalledWith('123', 1, 20);
  }));

  it('should search for earned trophies when searchEarnedTrophies is called', fakeAsync(() => {
    userServiceSpy.searchEarnedTrophies.and.returnValue(of(mockTrophySearchResult));

    store.searchTrophies('123');
    flushMicrotasks();

    expect(userServiceSpy.searchEarnedTrophies).toHaveBeenCalledWith('123', 0, 20);
    expect(store.trophyResults()).toEqual(mockTrophySearchResult.content);
    expect(store.isLoadingTrophies()).toBeFalse();
    expect(store.hasMoreTrophies()).toBeTrue();
  }));

  it('should search for trophies when loadMoreTrophies is called', fakeAsync(() => {
    userServiceSpy.searchEarnedTrophies.and.returnValue(of(mockTrophySearchResult));

    store.loadMoreTrophies('123');
    flushMicrotasks();

    expect(userServiceSpy.searchEarnedTrophies).toHaveBeenCalledWith('123', 1, 20);
  }));
});
