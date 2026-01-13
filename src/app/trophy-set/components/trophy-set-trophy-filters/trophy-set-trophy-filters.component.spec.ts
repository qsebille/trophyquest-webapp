import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrophySetTrophyFiltersComponent} from './trophy-set-trophy-filters.component';

describe('TrophySetTrophyFiltersComponent', () => {
    let component: TrophySetTrophyFiltersComponent;
    let fixture: ComponentFixture<TrophySetTrophyFiltersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TrophySetTrophyFiltersComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TrophySetTrophyFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
