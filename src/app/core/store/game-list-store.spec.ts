import {TestBed} from '@angular/core/testing';

import {GameListStore} from './game-list-store';
import {GameService} from '../services/game.service';

describe('GameListStore', () => {
  let service: GameListStore;

  let gameServiceSpy: jasmine.SpyObj<GameService>;

  beforeEach(() => {
    gameServiceSpy = jasmine.createSpyObj<GameService>('GameService', ['searchGames']);
    TestBed.configureTestingModule({
      providers: [
        {provide: GameService, useValue: gameServiceSpy},
      ]
    });
    service = TestBed.inject(GameListStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
