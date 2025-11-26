import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {UserStore} from './user-store';
import {UserService} from '../services/user.service';
import {of} from 'rxjs';
import {User} from '../models/dto/user';

describe('UserStore', () => {
  let store: UserStore;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  const users: User[] = [
    {id: '123', profileName: 'John Doe', avatarUrl: 'avatar.png'},
    {id: '234', profileName: 'Jane Doe', avatarUrl: 'avatar-2.png'},
  ];
  const searchResult = {content: users, totalElements: users.length};

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
    userServiceSpy.search.and.returnValue(of(searchResult));

    store.search();
    flushMicrotasks();

    expect(userServiceSpy.search).toHaveBeenCalled();
    expect(store.list()).toEqual(users);
  }));

  it('should reset state when reset is called', fakeAsync(() => {
    userServiceSpy.search.and.returnValue(of(searchResult));

    store.search();
    flushMicrotasks();
    store.reset();

    expect(store.list()).toEqual([]);
  }));

});
