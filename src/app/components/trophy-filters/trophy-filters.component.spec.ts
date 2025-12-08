import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrophyFiltersComponent} from './trophy-filters.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';

describe('TrophyFilterComponent', () => {
  let component: TrophyFiltersComponent;
  let fixture: ComponentFixture<TrophyFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSlideToggleModule,
        MatRadioModule,
        FormsModule,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TrophyFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit showHiddenTrophies event when hidden trophies toggler is clicked', () => {
    const spy = spyOn(component.showHiddenTrophies, 'emit');

    component.hiddenFilterChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit trophyEarnedFilterChanged event when earnedFilterChanges is called', () => {
    const spy = spyOn(component.trophyEarnedFilterChanged, 'emit');
    component.wantedTrophyEarnedType = 'earned';

    component.earnedFilterChanges();

    expect(spy).toHaveBeenCalledWith('earned');
  });
});
