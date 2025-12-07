import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProfileGameCard} from './profile-game-card';
import {PlayerCollection} from '../../core/models/dto/player-collection';

describe('ProfileGameCard', () => {
  let component: ProfileGameCard;
  let fixture: ComponentFixture<ProfileGameCard>;

  const mockCollection: PlayerCollection = {
    collectionId: '001',
    collectionTitle: 'Collection 1',
    collectionPlatform: 'PS5',
    collectionImageUrl: 'collection.png',
    gameId: 'game-001',
    gameTitle: 'Game 1',
    gameImageUrl: 'game.png',
    collectionTrophies: {platinum: 1, gold: 2, silver: 3, bronze: 4},
    earnedTrophies: {platinum: 1, gold: 2, silver: 3, bronze: 4}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileGameCard]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileGameCard);
    component = fixture.componentInstance;
    component.collection = mockCollection;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
