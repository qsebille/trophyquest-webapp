import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProfileTrophyCard} from './profile-trophy-card';
import {Trophy} from '../../core/models/dto/trophy';

describe('ProfileTrophyCard', () => {
  let component: ProfileTrophyCard;
  let fixture: ComponentFixture<ProfileTrophyCard>;

  const trophyMock: Trophy = {
    id: '001',
    trophyTitle: 'Trophy 1',
    trophyDescription: 'Description 1',
    trophyType: 'platinum',
    isHidden: false,
    iconUrl: 'trophy.png',
    gameTitle: 'Game 1',
    earnedDate: null,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileTrophyCard]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileTrophyCard);
    component = fixture.componentInstance;
    component.trophy = trophyMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
