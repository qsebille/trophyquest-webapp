import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrophySetTrophyListComponent} from './trophy-set-trophy-list.component';

describe('TrophySetTrophyListComponent', () => {
    let component: TrophySetTrophyListComponent;
    let fixture: ComponentFixture<TrophySetTrophyListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TrophySetTrophyListComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TrophySetTrophyListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
