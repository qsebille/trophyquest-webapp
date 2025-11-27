import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrophyCountDisplayer} from './trophy-count-displayer';

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

  it('should only display trophy type if count is greater than 0', () => {
    component.trophyCount = {platinum: 0, gold: 0, silver: 0, bronze: 0};
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector(".platinum-trophy")).toBeNull();
    expect(fixture.nativeElement.querySelector(".gold-trophy")).toBeNull();
    expect(fixture.nativeElement.querySelector(".silver-trophy")).toBeNull();
    expect(fixture.nativeElement.querySelector(".bronze-trophy")).toBeNull();

    component.trophyCount = {platinum: 1, gold: 2, silver: 3, bronze: 4};
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector(".platinum-trophy")).not.toBeNull();
    expect(fixture.nativeElement.querySelector(".gold-trophy")).not.toBeNull();
    expect(fixture.nativeElement.querySelector(".silver-trophy")).not.toBeNull();
    expect(fixture.nativeElement.querySelector(".bronze-trophy")).not.toBeNull();
  });

});
