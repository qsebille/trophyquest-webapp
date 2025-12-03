import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserListPage} from './user-list-page.component';
import {Router} from '@angular/router';
import {UserStore} from '../../core/store/user-store';

describe('UserListPage', () => {
  let component: UserListPage;
  let fixture: ComponentFixture<UserListPage>;
  let routerSpy: jasmine.SpyObj<Router>;
  let userStoreSpy: jasmine.SpyObj<UserStore>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    userStoreSpy = jasmine.createSpyObj('UserStore', ['reset', 'search', 'results']);

    userStoreSpy.results.and.returnValue([]);
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [UserListPage],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: UserStore, useValue: userStoreSpy},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset search on init', () => {
    expect(userStoreSpy.reset).toHaveBeenCalled();
    expect(userStoreSpy.search).toHaveBeenCalled();
  });

  it('should navigate to profile page', () => {
    userStoreSpy.results.and.returnValue([{
      id: '123',
      profileName: 'John Doe',
      avatarUrl: 'avatar.png',
    }]);

    fixture.detectChanges();

    const goToProfileButton = fixture.nativeElement.querySelector('.user-see-profile-button') as HTMLButtonElement;

    goToProfileButton.click();

    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/profile', '123']);
  });

});
