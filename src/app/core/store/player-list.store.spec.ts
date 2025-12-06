import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {PlayerListStore} from './player-list-store';
import {PlayerService} from '../services/player.service';
import {of} from 'rxjs';
import {Player} from '../models/dto/player';
import {SearchResult} from '../models/dto/search-result';

describe('PlayerListStore', () => {
  let store: PlayerListStore;
  let playerServiceSpy: jasmine.SpyObj<PlayerService>;

  const searchResultMock: SearchResult<Player> = {
    content: [
      {id: '123', pseudo: 'John Doe', avatarUrl: 'avatar.png'},
      {id: '234', pseudo: 'Jane Doe', avatarUrl: 'avatar-2.png'},
    ],
    total: 2
  };

  beforeEach(() => {
    playerServiceSpy = jasmine.createSpyObj<PlayerService>('PlayerService', ['search']);
    TestBed.configureTestingModule({
      providers: [
        {provide: PlayerService, useValue: playerServiceSpy},
      ]
    });
    store = TestBed.inject(PlayerListStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should update player list when search succeeds', fakeAsync(() => {
    playerServiceSpy.search.and.returnValue(of(searchResultMock));

    store.search();
    flushMicrotasks();

    expect(playerServiceSpy.search).toHaveBeenCalled();
    expect(store.playerSummaries()).toEqual(searchResultMock.content);
  }));

  it('should reset state when reset is called', fakeAsync(() => {
    playerServiceSpy.search.and.returnValue(of(searchResultMock));

    store.search();
    flushMicrotasks();
    store.reset();

    expect(store.playerSummaries()).toEqual([]);
  }));

});
