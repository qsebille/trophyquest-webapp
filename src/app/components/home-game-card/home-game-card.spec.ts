import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeGameCard} from './home-game-card';
import {Game} from '../../core/models/dto/game';

describe('HomeGameCard', () => {
  let component: HomeGameCard;
  let fixture: ComponentFixture<HomeGameCard>;

  const gameMock: Game = {
    id: '001',
    title: 'Game 1',
    platforms: ['PS4'],
    imageUrl: 'game.png'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGameCard]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeGameCard);
    component = fixture.componentInstance;
    component.game = gameMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
