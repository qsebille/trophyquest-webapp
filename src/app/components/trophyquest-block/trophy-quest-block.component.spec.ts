import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrophyQuestBlockComponent} from './trophy-quest-block.component';

describe('TrophyquestBlockComponent', () => {
    let component: TrophyQuestBlockComponent;
    let fixture: ComponentFixture<TrophyQuestBlockComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TrophyQuestBlockComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TrophyQuestBlockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
