import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileGameList} from './profile-game-list';
import {UserGame} from '../../core/models/dto/user-game';

describe('ProfileGameList', () => {
  let component: ProfileGameList;
  let fixture: ComponentFixture<ProfileGameList>;

  const mockGame1: UserGame = {
    id: '1',
    title: 'Mock Game 1',
    imageUrl: '/mock-game-image-1.png',
    earnedTrophies: {platinum: 1, gold: 2, silver: 3, bronze: 4},
    totalTrophies: {platinum: 1, gold: 2, silver: 3, bronze: 4},
    trophyCollections: [
      {id: 'coll-1', title: 'Collection 1', platform: 'ps4', imageUrl: '/mock-collection-img-1.png'},
      {id: 'coll-2', title: 'Collection 2', platform: 'ps5', imageUrl: '/mock-collection-img-2.png'}
    ]
  };
  const mockGame2: UserGame = {
    id: '2',
    title: 'Mock Game 2',
    imageUrl: '/mock-game-image-2.png',
    earnedTrophies: {platinum: 1, gold: 2, silver: 3, bronze: 4},
    totalTrophies: {platinum: 1, gold: 2, silver: 3, bronze: 4},
    trophyCollections: [
      {id: 'coll-1', title: 'Collection 1', platform: 'ps4', imageUrl: '/mock-collection-img-1.png'}
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileGameList]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileGameList);
    component = fixture.componentInstance;
    component.gameList = [mockGame1, mockGame2];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle expansion state for a game id', () => {
    expect(component.isExpanded(mockGame1.id)).toBeFalse();

    component.toggle(mockGame1.id);
    expect(component.isExpanded(mockGame1.id)).toBeTrue();

    component.toggle(mockGame1.id);
    expect(component.isExpanded(mockGame1.id)).toBeFalse();
  });

  it('should render details only when expanded', () => {
    component.gameList = [mockGame1];
    fixture.detectChanges();

    const toggleButton: HTMLButtonElement | null = fixture.nativeElement.querySelector(
      '[data-testid="game-toggle-1"]'
    );
    expect(toggleButton).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-testid="game-details-1"]')).toBeNull();

    toggleButton!.click();
    fixture.detectChanges();

    const details = fixture.nativeElement.querySelector('[data-testid="game-details-1"]');
    expect(details).toBeTruthy();
    expect(toggleButton!.getAttribute('aria-expanded')).toBe('true');
  });
});
