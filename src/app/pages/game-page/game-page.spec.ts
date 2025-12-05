import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GamePage} from './game-page';
import {GameStore} from '../../core/store/game-store';
import {ActivatedRoute} from '@angular/router';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Game} from '../../core/models/dto/game';
import {Trophy} from '../../core/models/dto/trophy';

describe('GamePage', () => {
  let component: GamePage;
  let fixture: ComponentFixture<GamePage>;
  let gameStoreSpy: jasmine.SpyObj<GameStore>;

  @Component({selector: 'app-game-summary', template: ''})
  class MockGameSummary {
    @Input({required: true}) game: Game | undefined;
  }

  @Component({selector: 'app-trophy-card', template: ''})
  class MockTrophyCard {
    @Input({required: true}) trophy: Trophy | undefined
    @Input({required: false}) imageSize: number = 50
    @Input({required: false}) showHiddenTrophies: boolean = false
  }

  @Component({selector: 'app-trophy-filters', template: ''})
  class MockTrophyFilters {
    @Input({required: false}) public initEarnedFilter: 'all' | 'earned' | 'unearned' = 'all';
    @Output() public readonly showHiddenTrophies = new EventEmitter<boolean>();
    @Output() public readonly trophyEarnedFilterChanged = new EventEmitter<'all' | 'earned' | 'unearned'>();
  }

  const playerId = '000';
  const gameId = '123';
  const collectionId = '456';

  beforeEach(async () => {
    gameStoreSpy = jasmine.createSpyObj('GameStore', ['fetchPlayerGame', 'game', 'baseGameTrophies', 'earnedFilter', 'dlcTrophies']);
    gameStoreSpy.game.and.returnValue({id: '123', title: 'Game 1', imageUrl: 'game.png'});

    await TestBed.configureTestingModule({
      imports: [GamePage, MockGameSummary, MockTrophyFilters, MockTrophyCard],
      providers: [
        {provide: GameStore, useValue: gameStoreSpy},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {get: () => gameId},
              queryParamMap: {get: (key: string) => key === 'collectionId' ? collectionId : playerId}
            }
          }
        }
      ]
    })
      .compileComponents();

    TestBed.overrideComponent(GamePage, {
      set: {
        imports: [GamePage, MockGameSummary, MockTrophyFilters, MockTrophyCard],
        providers: [{provide: GameStore, useValue: gameStoreSpy}],
      }
    });

    fixture = TestBed.createComponent(GamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read params id from query parameters', () => {
    expect(component.playerId).toEqual(playerId);
    expect(component.gameId).toEqual(gameId);
    expect(component.collectionId).toEqual(collectionId);
  });

  it('should fetch game on init', () => {
    expect(gameStoreSpy.fetchPlayerGame).toHaveBeenCalledWith(playerId, gameId, collectionId);
  });

});
