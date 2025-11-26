import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {GameStore} from './game-store';
import {GameService} from '../services/game.service';
import {ErrorService} from '../services/error.service';
import {Game} from '../models/dto/game';
import {of} from 'rxjs';

describe('GameStore', () => {
  let store: GameStore;
  let gameServiceSpy: jasmine.SpyObj<GameService>;
  let errorServiceSpy: jasmine.SpyObj<ErrorService>;

  beforeEach(() => {
    gameServiceSpy = jasmine.createSpyObj<GameService>('GameService', ['fetchGame']);
    errorServiceSpy = jasmine.createSpyObj<ErrorService>('ErrorService', ['logErrorAndRedirect']);
    TestBed.configureTestingModule({
      providers: [
        {provide: GameService, useValue: gameServiceSpy},
        {provide: ErrorService, useValue: errorServiceSpy},
      ]
    });
    store = TestBed.inject(GameStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should update game when fetch succeeds', fakeAsync(() => {
    const gameMock: Game = {id: '123', title: 'Game 1', platforms: [], imageUrl: 'img.png'};
    gameServiceSpy.fetchGame.and.returnValue(of(gameMock));

    store.fetch('123');
    flushMicrotasks();

    expect(store.game()).toEqual(gameMock);
    expect(gameServiceSpy.fetchGame).toHaveBeenCalledWith('123');
  }));
});
