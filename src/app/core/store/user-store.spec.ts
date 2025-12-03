import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {UserStore} from './user-store';
import {UserService} from '../services/user.service';
import {of} from 'rxjs';
import {User} from '../models/dto/user';
import {SearchResult} from '../models/dto/search-result';

describe('UserStore', () => {
  let store: UserStore;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  const searchResultMock: SearchResult<User> = {
    content: [
      {id: '123', profileName: 'John Doe', avatarUrl: 'avatar.png'},
      {id: '234', profileName: 'Jane Doe', avatarUrl: 'avatar-2.png'},
    ],
    total: 2
  };

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj<UserService>('UserService', ['search']);
    TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useValue: userServiceSpy},
      ]
    });
    store = TestBed.inject(UserStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should update user list when search succeeds', fakeAsync(() => {
    userServiceSpy.search.and.returnValue(of(searchResultMock));

    store.search();
    flushMicrotasks();

    expect(userServiceSpy.search).toHaveBeenCalled();
    expect(store.results()).toEqual(searchResultMock.content);
  }));

  it('should reset state when reset is called', fakeAsync(() => {
    userServiceSpy.search.and.returnValue(of(searchResultMock));

    store.search();
    flushMicrotasks();
    store.reset();

    expect(store.results()).toEqual([]);
  }));

});
