import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayersPage} from './players-page.component';
import {Router} from '@angular/router';
import {PlayerListStore} from '../../core/store/player-list-store';

describe('PlayersPage', () => {
  let component: PlayersPage;
  let fixture: ComponentFixture<PlayersPage>;
  let routerSpy: jasmine.SpyObj<Router>;
  let playerListStoreSpy: jasmine.SpyObj<PlayerListStore>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    playerListStoreSpy = jasmine.createSpyObj('PlayerListStore', ['reset', 'search', 'results']);

    playerListStoreSpy.results.and.returnValue([]);
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [PlayersPage],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: PlayerListStore, useValue: playerListStoreSpy},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PlayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset search on init', () => {
    expect(playerListStoreSpy.reset).toHaveBeenCalled();
    expect(playerListStoreSpy.search).toHaveBeenCalled();
  });

  it('should navigate to profile page', () => {
    playerListStoreSpy.results.and.returnValue([{
      id: '123',
      pseudo: 'John Doe',
      avatarUrl: 'avatar.png',
    }]);

    fixture.detectChanges();

    const goToProfileButton = fixture.nativeElement.querySelector('.see-profile-button') as HTMLButtonElement;

    goToProfileButton.click();

    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/profile', '123']);
  });

});
