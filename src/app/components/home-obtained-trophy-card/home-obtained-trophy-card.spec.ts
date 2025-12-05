import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeObtainedTrophyCard} from './home-obtained-trophy-card';
import {ObtainedTrophy} from '../../core/models/dto/obtained-trophy';

describe('HomeObtainedTrophyCard', () => {
  let component: HomeObtainedTrophyCard;
  let fixture: ComponentFixture<HomeObtainedTrophyCard>;

  const mockObtainedTrophy: ObtainedTrophy = {
    id: '001',
    trophyTitle: 'Trophy 1',
    trophyType: 'bronze',
    trophyDescription: 'Get trophy 1',
    trophyIconUrl: 'trophy.png',
    gameTitle: 'Game',
    obtainedDate: '2025-01-01T00:00:00',
    obtainedBy: 'John Doe',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeObtainedTrophyCard]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeObtainedTrophyCard);
    component = fixture.componentInstance;
    component.trophy = mockObtainedTrophy;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
