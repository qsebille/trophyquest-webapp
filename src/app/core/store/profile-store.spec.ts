import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';
import {of, throwError} from 'rxjs';

import {ProfileStore} from './profile-store';
import {UserService} from '../services/user.service';
import {ErrorService} from '../services/error.service';
import {User} from '../models/dto/user';
import {TrophyCount} from '../models/dto/trophy-count';
import {UserGame} from '../models/dto/user-game';
import {Trophy} from '../models/dto/trophy';

describe('ProfileStore', () => {
  let store: ProfileStore;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let errorServiceSpy: jasmine.SpyObj<ErrorService>;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj<UserService>('UserService', [
      'fetchUser',
      'getTrophyCount',
      'searchGames',
      'searchEarnedTrophies'
    ]);
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

  it('should log an error when fetching with an invalid user id', () => {
    store.fetch(null);

    expect(errorServiceSpy.logErrorAndRedirect).toHaveBeenCalledWith('Invalid user id');
    expect(userServiceSpy.fetchUser).not.toHaveBeenCalled();
  });

  it('should populate state when fetch succeeds', fakeAsync(() => {
    const user: User = {id: '123', profileName: 'Test User', avatarUrl: 'avatar.png'};
    const trophyCount: TrophyCount = {platinum: 1, gold: 2, silver: 3, bronze: 4};
    const games: UserGame[] = [
      {
        id: 'game-1',
        title: 'Game 1',
        imageUrl: 'img.png',
        earnedTrophies: trophyCount,
        totalTrophies: trophyCount,
        trophyCollections: []
      }
    ];
    const trophies: Trophy[] = [
      {
        id: 'trophy-1',
        trophyTitle: 'Trophy 1',
        trophyDescription: 'desc',
        trophyType: 'gold',
        iconUrl: 'img.png',
        gameTitle: 'Game 1',
        earnedDate: new Date().toISOString()
      }
    ];

    userServiceSpy.fetchUser.and.returnValue(of(user));
    userServiceSpy.getTrophyCount.and.returnValue(of(trophyCount));
    userServiceSpy.searchGames.and.returnValue(of({content: games, totalElements: games.length}));
    userServiceSpy.searchEarnedTrophies.and.returnValue(of({content: trophies, totalElements: trophies.length}));

    store.fetch('123');
    flushMicrotasks();

    expect(userServiceSpy.fetchUser).toHaveBeenCalledWith('123');
    expect(userServiceSpy.searchGames).toHaveBeenCalledWith('123', 0, 50);
    expect(store.user()).toEqual(user);
    expect(store.trophyCount()).toEqual(trophyCount);
    expect(store.gameList()).toEqual(games);
    expect(store.trophyList()).toEqual(trophies);
    expect(errorServiceSpy.logErrorAndRedirect).not.toHaveBeenCalled();
  }));

  it('should log an error when fetch fails', () => {
    userServiceSpy.fetchUser.and.returnValue(throwError(() => new Error('failure')));
    userServiceSpy.getTrophyCount.and.returnValue(of({platinum: 0, gold: 0, silver: 0, bronze: 0}));
    userServiceSpy.searchGames.and.returnValue(of({content: [], totalElements: 0}));
    userServiceSpy.searchEarnedTrophies.and.returnValue(of({content: [], totalElements: 0}));

    store.fetch('123');

    expect(errorServiceSpy.logErrorAndRedirect).toHaveBeenCalledWith('Failed loading profile: 123');
  });
});
