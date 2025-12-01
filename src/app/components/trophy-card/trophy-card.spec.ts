import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrophyCard } from './trophy-card';

describe('TrophyCard', () => {
  let component: TrophyCard;
  let fixture: ComponentFixture<TrophyCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrophyCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrophyCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
