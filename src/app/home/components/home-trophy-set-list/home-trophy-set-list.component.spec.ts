import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeTrophySetListComponent} from './home-trophy-set-list.component';

describe('HomeTrophySetListComponent', () => {
    let component: HomeTrophySetListComponent;
    let fixture: ComponentFixture<HomeTrophySetListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeTrophySetListComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HomeTrophySetListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
