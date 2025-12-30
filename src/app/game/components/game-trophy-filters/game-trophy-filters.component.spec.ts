import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameTrophyFiltersComponent} from './game-trophy-filters.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';

describe('TrophyFilterComponent', () => {
    let component: GameTrophyFiltersComponent;
    let fixture: ComponentFixture<GameTrophyFiltersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatSlideToggleModule,
                MatRadioModule,
                FormsModule,
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(GameTrophyFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit showHiddenTrophies event when hidden trophies toggler is clicked', () => {
        const spy = spyOn(component.showHiddenTrophyChange, 'emit');

        component.hiddenFilterChanges();

        expect(spy).toHaveBeenCalled();
    });

});
