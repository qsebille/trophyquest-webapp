import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrophySetSummaryComponent} from './trophy-set-summary.component';
import {TrophySet} from "../../../core/api/dtos/trophy-set/trophy-set";

describe('TrophySetSummaryComponent', () => {
    let component: TrophySetSummaryComponent;
    let fixture: ComponentFixture<TrophySetSummaryComponent>;

    const mockTrophySet = {
        id: 'trophy-set-123',
        title: 'Trophy Set 123',
        platform: 'ps5',
        image: 'ts.png'
    } as TrophySet;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TrophySetSummaryComponent]
        }).compileComponents();


        fixture = TestBed.createComponent(TrophySetSummaryComponent);
        fixture.componentRef.setInput('trophySet', mockTrophySet);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
