import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGameListComponent } from './profile-game-list.component';

describe('ProfileGameListComponent', () => {
  let component: ProfileGameListComponent;
  let fixture: ComponentFixture<ProfileGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileGameListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
