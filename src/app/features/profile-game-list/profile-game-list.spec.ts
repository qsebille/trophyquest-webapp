import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGameList } from './profile-game-list';

describe('ProfileGameList', () => {
  let component: ProfileGameList;
  let fixture: ComponentFixture<ProfileGameList>;

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
});
