import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrophyFilters } from './trophy-filters';

describe('TrophyFilters', () => {
  let component: TrophyFilters;
  let fixture: ComponentFixture<TrophyFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrophyFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrophyFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
