import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {GameStore} from './game-store';
import {GameService} from '../services/game.service';
import {ErrorService} from '../services/error.service';
import {Game} from '../models/dto/game';
import {of} from 'rxjs';
import {PlayerService} from '../services/player.service';
import {GameGroupTrophies} from '../models/dto/game-group-trophies';
import {Trophy} from '../models/dto/trophy';

describe('GameStore', () => {
  let store: GameStore;
  let gameServiceSpy: jasmine.SpyObj<GameService>;
  let playerServiceSpy: jasmine.SpyObj<PlayerService>;
  let errorServiceSpy: jasmine.SpyObj<ErrorService>;

  const gameMock: Game = {id: '123', title: 'Game 1', imageUrl: 'img.png'};
  const baseTrophy1Mock: Trophy = {
    id: '001',
    trophyTitle: 'Trophy 1',
    trophyDescription: 'Description 1',
    trophyType: 'platinum',
    isHidden: false,
    iconUrl: 'trophy-1.png',
    gameTitle: gameMock.title,
    earnedDate: null,
  };
  const baseTrophy2Mock: Trophy = {
    id: '002',
    trophyTitle: 'Trophy 2',
    trophyDescription: 'Description 2',
    trophyType: 'gold',
    isHidden: true,
    iconUrl: 'trophy-2.png',
    gameTitle: gameMock.title,
    earnedDate: '2025-01-01T00:00:00.000Z',
  };
  const dlcTrophy1Mock: Trophy = {
    id: '003',
    trophyTitle: 'Trophy 3',
    trophyDescription: 'Description 3',
    trophyType: 'silver',
    isHidden: false,
    iconUrl: 'trophy-3.png',
    gameTitle: gameMock.title,
    earnedDate: null,
  };
  const dlcTrophy2Mock: Trophy = {
    id: '004',
    trophyTitle: 'Trophy 4',
    trophyDescription: 'Description 4',
    trophyType: 'bronze',
    isHidden: true,
    iconUrl: 'trophy-4.png',
    gameTitle: gameMock.title,
    earnedDate: '2025-01-01T00:00:00.000Z',
  };
  const groupTrophiesMock: GameGroupTrophies[] = [
    {
      groupName: 'default',
      trophies: [baseTrophy1Mock, baseTrophy2Mock],
    },
    {
      groupName: 'dlc-1',
      trophies: [dlcTrophy1Mock, dlcTrophy2Mock],
    },
  ];

  beforeEach(() => {
    gameServiceSpy = jasmine.createSpyObj<GameService>('GameService', ['fetchGame']);
    playerServiceSpy = jasmine.createSpyObj<PlayerService>('PlayerService', ['retrieveCollectionTrophies']);
    errorServiceSpy = jasmine.createSpyObj<ErrorService>('ErrorService', ['logErrorAndRedirect']);
    TestBed.configureTestingModule({
      providers: [
        {provide: GameService, useValue: gameServiceSpy},
        {provide: PlayerService, useValue: playerServiceSpy},
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
    playerServiceSpy.retrieveCollectionTrophies.and.returnValue(of([]));

    store.fetchPlayerGame('000', '123', '456');
    flushMicrotasks();

    expect(gameServiceSpy.fetchGame).toHaveBeenCalledWith('123');
    expect(store.game()).toEqual(gameMock);
  }));

  it('should update trophies when fetch succeeds', fakeAsync(() => {
    gameServiceSpy.fetchGame.and.returnValue(of(gameMock));
    playerServiceSpy.retrieveCollectionTrophies.and.returnValue(of(groupTrophiesMock));

    store.fetchPlayerGame('000', '123', '456');
    flushMicrotasks();

    expect(playerServiceSpy.retrieveCollectionTrophies).toHaveBeenCalledOnceWith('000', '456');
    expect(store.baseGameTrophies()).toEqual(groupTrophiesMock.filter(g => g.groupName === 'default')[0].trophies);
    expect(store.dlcTrophies()).toEqual(groupTrophiesMock.filter(g => g.groupName !== 'default'));
  }));

  it('should update trophies when earned filter changes', fakeAsync(() => {
    gameServiceSpy.fetchGame.and.returnValue(of(gameMock));
    playerServiceSpy.retrieveCollectionTrophies.and.returnValue(of(groupTrophiesMock));

    store.fetchPlayerGame('000', '123', '456');
    flushMicrotasks();

    // Changed filter to "all"
    store.changeEarnedFilter('all');
    expect(store.earnedFilter()).toEqual('all');
    expect(store.baseGameTrophies()).toEqual([baseTrophy1Mock, baseTrophy2Mock]);
    expect(store.dlcTrophies()).toEqual([{
      groupName: 'dlc-1',
      trophies: [dlcTrophy1Mock, dlcTrophy2Mock],
    }]);

    // Changed filter to "earned"
    store.changeEarnedFilter('earned');
    expect(store.earnedFilter()).toEqual('earned');
    expect(store.baseGameTrophies()).toEqual([baseTrophy2Mock]);
    expect(store.dlcTrophies()).toEqual([{
      groupName: 'dlc-1',
      trophies: [dlcTrophy2Mock],
    }]);

    // Changed filter to "unearned"
    store.changeEarnedFilter('unearned');
    expect(store.earnedFilter()).toEqual('unearned');
    expect(store.baseGameTrophies()).toEqual([baseTrophy1Mock]);
    expect(store.dlcTrophies()).toEqual([{
      groupName: 'dlc-1',
      trophies: [dlcTrophy1Mock],
    }]);

  }));

});
