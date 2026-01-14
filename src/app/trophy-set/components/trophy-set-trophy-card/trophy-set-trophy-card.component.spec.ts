import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrophySetTrophyCardComponent} from './trophy-set-trophy-card.component';
import {EarnedTrophy} from "../../../core/api/dtos/trophy/earned-trophy";

describe('TrophySetTrophyCardComponent', () => {
    let component: TrophySetTrophyCardComponent;
    let fixture: ComponentFixture<TrophySetTrophyCardComponent>;

    const mockTrophy = {id: 'trophy-123', title: 'Trophy 123', icon: 'trophy.png'} as EarnedTrophy;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TrophySetTrophyCardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TrophySetTrophyCardComponent);
        fixture.componentRef.setInput('trophy', mockTrophy);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
