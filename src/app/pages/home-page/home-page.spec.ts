import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePage} from './home-page';
import {Component} from '@angular/core';
import {GameListStore} from '../../core/store/game-list-store';
import {LastObtainedTrophiesStore} from '../../core/store/last-obtained-trophies-store';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  let gameListStoreSpy: jasmine.SpyObj<GameListStore>;
  let lastObtainedTrophyStoreSpy: jasmine.SpyObj<LastObtainedTrophiesStore>;

  @Component({selector: 'app-home-game-card', template: ''})
  class MockHomeGameCard {
  }

  @Component({selector: 'app-home-obtained-trophy-card', template: ''})
  class MockHomeLastObtainedTrophies {
  }

  beforeEach(async () => {
    gameListStoreSpy = jasmine.createSpyObj('GameListStore', ['results', 'resetState', 'search', 'loadMore', 'hasMoreGames', 'isLoading']);
    lastObtainedTrophyStoreSpy = jasmine.createSpyObj('LastObtainedTrophiesStore', ['results', 'resetState', 'search', 'loadMore', 'hasMoreTrophies', 'isLoading']);
    await TestBed.configureTestingModule({
      imports: [HomePage, MockHomeGameCard, MockHomeLastObtainedTrophies],
    }).compileComponents();

    TestBed.overrideComponent(HomePage, {
      set: {
        imports: [MockHomeGameCard, MockHomeLastObtainedTrophies],
        providers: [
          {provide: GameListStore, useValue: gameListStoreSpy},
          {provide: LastObtainedTrophiesStore, useValue: lastObtainedTrophyStoreSpy},
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
    expect(lastObtainedTrophyStoreSpy.resetState).toHaveBeenCalled();
    expect(lastObtainedTrophyStoreSpy.search).toHaveBeenCalled();
  });
});
