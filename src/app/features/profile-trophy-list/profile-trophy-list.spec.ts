import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTrophyList } from './profile-trophy-list';

describe('ProfileTrophyList', () => {
  let component: ProfileTrophyList;
  let fixture: ComponentFixture<ProfileTrophyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileTrophyList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileTrophyList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
