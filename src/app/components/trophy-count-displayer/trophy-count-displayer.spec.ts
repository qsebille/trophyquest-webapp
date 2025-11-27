import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrophyCountDisplayer } from './trophy-count-displayer';

describe('TrophyCountDisplayer', () => {
  let component: TrophyCountDisplayer;
  let fixture: ComponentFixture<TrophyCountDisplayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrophyCountDisplayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrophyCountDisplayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
