import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CollectionTrophyCardComponent} from './collection-trophy-card.component';

describe('CollectionTrophyCardComponent', () => {
    let component: CollectionTrophyCardComponent;
    let fixture: ComponentFixture<CollectionTrophyCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CollectionTrophyCardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CollectionTrophyCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
