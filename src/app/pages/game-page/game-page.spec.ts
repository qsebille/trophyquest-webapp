import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GamePage} from './game-page';
import {GameStore} from '../../core/store/game-store';
import {ActivatedRoute} from '@angular/router';

describe('GamePage', () => {
  let component: GamePage;
  let fixture: ComponentFixture<GamePage>;
  let gameStoreSpy: jasmine.SpyObj<GameStore>;

  const userId = '000';
  const gameId = '123';
  const collectionId = '456';

  beforeEach(async () => {
    gameStoreSpy = jasmine.createSpyObj('GameStore', ['fetchUserGame', 'game', 'trophies']);
    gameStoreSpy.game.and.returnValue({id: '123', title: 'Game 1', platforms: [], imageUrl: 'game.png'});

    await TestBed.configureTestingModule({
      imports: [GamePage],
      providers: [
        {provide: GameStore, useValue: jasmine.createSpyObj('GameStore', ['fetch'])},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {get: () => gameId},
              queryParamMap: {get: (key: string) => key === 'collectionId' ? collectionId : userId}
            }
          }
        }
      ]
    })
      .compileComponents();

    TestBed.overrideComponent(GamePage, {set: {providers: [{provide: GameStore, useValue: gameStoreSpy}]}});

    fixture = TestBed.createComponent(GamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read params id from query parameters', () => {
    expect(component.userId).toEqual(userId);
    expect(component.gameId).toEqual(gameId);
    expect(component.collectionId).toEqual(collectionId);
  });

  it('should fetch game on init', () => {
    expect(gameStoreSpy.fetchUserGame).toHaveBeenCalledWith(userId, gameId, collectionId);
  });

});
