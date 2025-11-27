import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GamePage} from './game-page';
import {GameStore} from '../../core/store/game-store';
import {ActivatedRoute} from '@angular/router';

describe('GamePage', () => {
  let component: GamePage;
  let fixture: ComponentFixture<GamePage>;
  let gameStoreSpy: jasmine.SpyObj<GameStore>;

  const gameId = '123';
  const collectionId = '456';

  beforeEach(async () => {
    gameStoreSpy = jasmine.createSpyObj('GameStore', ['fetch', 'game']);
    gameStoreSpy.game.and.returnValue({id: '123', title: 'Game 1', platforms: [], imageUrl: 'game.png'});

    await TestBed.configureTestingModule({
      imports: [GamePage],
      providers: [
        {provide: GameStore, useValue: jasmine.createSpyObj('GameStore', ['fetch'])},
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: {get: () => gameId}, queryParamMap: {get: () => collectionId}}}
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

  it('should fetch game on init', () => {
    expect(component.gameId).toEqual(gameId);
    expect(gameStoreSpy.fetch).toHaveBeenCalledWith(gameId);
  });

  it('should read collection id from query parameters', () => {
    expect(component.collectionId).toEqual(collectionId);
  });

});
