import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePage} from './home-page';
import {Component, Input} from '@angular/core';
import {GameListStore} from '../../core/store/game-list-store';
import {ObtainedTrophiesStore} from '../../core/store/obtained-trophies-store.service';
import {PlayerListStore} from '../../core/store/player-list-store';
import {Router} from '@angular/router';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  let routerSpy: jasmine.SpyObj<Router>;
  let gameListStoreSpy: jasmine.SpyObj<GameListStore>;
  let obtainedTrophyStoreSpy: jasmine.SpyObj<ObtainedTrophiesStore>;
  let playerListStoreSpy: jasmine.SpyObj<PlayerListStore>;

  @Component({selector: 'app-home-summary', template: ''})
  class MockHomeSummary {
    @Input({required: true}) nbGames: number = 0;
    @Input({required: true}) nbPlayers: number = 0;
    @Input({required: true}) nbTrophies: number = 0;
  }

  @Component({selector: 'app-home-game-card', template: ''})
  class MockHomeGameCard {
  }

  @Component({selector: 'app-home-obtained-trophy-card', template: ''})
  class MockHomeLastObtainedTrophies {
  }

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    gameListStoreSpy = jasmine.createSpyObj('GameListStore', ['results', 'resetState', 'search', 'loadMore', 'hasMoreGames', 'isLoading', 'total']);
    obtainedTrophyStoreSpy = jasmine.createSpyObj('ObtainedTrophiesStore', ['results', 'resetState', 'search', 'loadMore', 'hasMoreTrophies', 'isLoading', 'total']);
    playerListStoreSpy = jasmine.createSpyObj('PlayerListStore', ['reset', 'count', 'total']);

    await TestBed.configureTestingModule({
      imports: [HomePage, MockHomeSummary, MockHomeGameCard, MockHomeLastObtainedTrophies],
    }).compileComponents();

    TestBed.overrideComponent(HomePage, {
      set: {
        imports: [MockHomeSummary, MockHomeGameCard, MockHomeLastObtainedTrophies],
        providers: [
          {provide: Router, useValue: routerSpy},
          {provide: GameListStore, useValue: gameListStoreSpy},
          {provide: ObtainedTrophiesStore, useValue: obtainedTrophyStoreSpy},
          {provide: PlayerListStore, useValue: playerListStoreSpy},
        ],
      }
    });

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset state on init', () => {
    component.ngOnInit();

    expect(gameListStoreSpy.resetState).toHaveBeenCalled();
    expect(gameListStoreSpy.search).toHaveBeenCalled();
    expect(obtainedTrophyStoreSpy.resetState).toHaveBeenCalled();
    expect(obtainedTrophyStoreSpy.search).toHaveBeenCalled();
    expect(playerListStoreSpy.reset).toHaveBeenCalled();
    expect(playerListStoreSpy.count).toHaveBeenCalled();
  });

  it('should navigate to profile page', () => {
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    component.goToProfilePage('001');

    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/profile', '001']);
  });

});
