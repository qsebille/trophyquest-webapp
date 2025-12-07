import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProfileGameCard} from './profile-game-card';
import {PlayerGameAchievements} from '../../core/models/dto/player-game-achievements';

describe('ProfileGameCard', () => {
  let component: ProfileGameCard;
  let fixture: ComponentFixture<ProfileGameCard>;

  const mockAchievements: PlayerGameAchievements = {
    id: '001',
    title: 'Game 1',
    imageUrl: 'game.png',
    earnedTrophies: {bronze: 1, silver: 1, gold: 1, platinum: 1},
    totalTrophies: {bronze: 1, silver: 1, gold: 1, platinum: 1},
    trophyCollections: [],
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileGameCard]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileGameCard);
    component = fixture.componentInstance;
    component.collection = mockAchievements;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
