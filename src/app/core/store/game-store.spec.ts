import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {GameStore} from './game-store';
import {GameService} from '../services/game.service';
import {ErrorService} from '../services/error.service';
import {Game} from '../models/dto/game';
import {of} from 'rxjs';
import {UserService} from '../services/user.service';

describe('GameStore', () => {
  let store: GameStore;
  let gameServiceSpy: jasmine.SpyObj<GameService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let errorServiceSpy: jasmine.SpyObj<ErrorService>;

  const gameMock: Game = {id: '123', title: 'Game 1', platforms: [], imageUrl: 'img.png'};
  const trophiesMock: any[] = [
    {
      id: '1',
      gameId: '123',
      trophyTitle: 'Trophy 1',
      trophyDescription: 'desc',
      trophyType: 'gold',
      iconUrl: 'img.png'
    },
    {
      id: '2',
      gameId: '123',
      trophyTitle: 'Trophy 2',
      trophyDescription: 'desc',
      trophyType: 'silver',
      iconUrl: 'img.png'
    },
  ];

  beforeEach(() => {
    gameServiceSpy = jasmine.createSpyObj<GameService>('GameService', ['fetchGame']);
    userServiceSpy = jasmine.createSpyObj<UserService>('UserService', ['fetchCollectionTrophies']);
    errorServiceSpy = jasmine.createSpyObj<ErrorService>('ErrorService', ['logErrorAndRedirect']);
    TestBed.configureTestingModule({
      providers: [
        {provide: GameService, useValue: gameServiceSpy},
        {provide: UserService, useValue: userServiceSpy},
        {provide: ErrorService, useValue: errorServiceSpy},
      ]
    });
    store = TestBed.inject(GameStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should update game when fetch succeeds', fakeAsync(() => {
    gameServiceSpy.fetchGame.and.returnValue(of(gameMock));
    userServiceSpy.fetchCollectionTrophies.and.returnValue(of([]));

    store.fetchUserGame('000', '123', '456');
    flushMicrotasks();

    expect(gameServiceSpy.fetchGame).toHaveBeenCalledWith('123');
    expect(store.game()).toEqual(gameMock);
  }));

  it('should update trophies when fetch successds', fakeAsync(() => {
    gameServiceSpy.fetchGame.and.returnValue(of(gameMock));
    userServiceSpy.fetchCollectionTrophies.and.returnValue(of(trophiesMock));

    store.fetchUserGame('000', '123', '456');
    flushMicrotasks();

    expect(userServiceSpy.fetchCollectionTrophies).toHaveBeenCalledOnceWith('000', '456');
    expect(store.groupTrophies()).toEqual(trophiesMock);
  }));

});
