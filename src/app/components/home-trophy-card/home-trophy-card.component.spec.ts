import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeTrophyCardComponent} from './home-trophy-card.component';
import {ObtainedTrophy} from '../../core/models/dto/obtained-trophy';

describe('HomeTrophyCardComponent', () => {
    let component: HomeTrophyCardComponent;
    let fixture: ComponentFixture<HomeTrophyCardComponent>;

    const mockObtainedTrophy: ObtainedTrophy = {
        id: '001',
        trophyTitle: 'Trophy 1',
        trophyType: 'bronze',
        trophyDescription: 'Get trophy 1',
        trophyIconUrl: 'trophy.png',
        gameTitle: 'Game',
        obtainedDate: '2025-01-01T00:00:00',
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeTrophyCardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HomeTrophyCardComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('trophy', mockObtainedTrophy);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
