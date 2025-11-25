import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileGameList} from './profile-game-list';
import {UserGame} from '../../core/models/dto/user-game';

describe('ProfileGameList', () => {
  let component: ProfileGameList;
  let fixture: ComponentFixture<ProfileGameList>;

  const mockGame: UserGame = {
    id: '1',
    title: 'Mock Game',
    imageUrl: '/mock-image.png',
    earnedTrophies: {platinum: 1, gold: 2, silver: 3, bronze: 4},
    totalTrophies: {platinum: 1, gold: 2, silver: 3, bronze: 4}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileGameList]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileGameList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle expansion state for a game id', () => {
    expect(component.isExpanded(mockGame.id)).toBeFalse();

    component.toggle(mockGame.id);
    expect(component.isExpanded(mockGame.id)).toBeTrue();

    component.toggle(mockGame.id);
    expect(component.isExpanded(mockGame.id)).toBeFalse();
  });

  it('should render details only when expanded', () => {
    component.gameList = [mockGame];
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
