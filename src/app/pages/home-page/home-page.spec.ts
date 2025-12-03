import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePage} from './home-page';
import {Component} from '@angular/core';
import {GameListStore} from '../../core/store/game-list-store';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  let gameListStoreSpy: jasmine.SpyObj<GameListStore>;

  @Component({selector: 'app-home-game-card', template: ''})
  class MockHomeGameCard {
  }

  beforeEach(async () => {
    gameListStoreSpy = jasmine.createSpyObj('GameListStore', ['results', 'resetState', 'search', 'loadMore', 'hasMoreGames', 'isLoading']);
    await TestBed.configureTestingModule({
      imports: [HomePage, MockHomeGameCard],
    }).compileComponents();

    TestBed.overrideComponent(HomePage, {
      set: {
        imports: [MockHomeGameCard],
        providers: [{provide: GameListStore, useValue: gameListStoreSpy}],
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
  });
});
