import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileSummary} from './profile-summary';

describe('ProfileSummary', () => {
  let component: ProfileSummary;
  let fixture: ComponentFixture<ProfileSummary>;

  const mockPlayer = {id: '001', pseudo: 'Pseudo', avatarUrl: 'avatar.png'};
  const mockTrophyCount = {platinum: 1, gold: 2, silver: 3, bronze: 4};
  const mockTotalGamesPlayed = 100;
  const mockTotalTrophiesEarned = 1000;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSummary]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileSummary);
    component = fixture.componentInstance;
    component.player = mockPlayer;
    component.trophyCount = mockTrophyCount;
    component.totalGamesPlayed = mockTotalGamesPlayed;
    component.totalEarnedTrophies = mockTotalTrophiesEarned;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
