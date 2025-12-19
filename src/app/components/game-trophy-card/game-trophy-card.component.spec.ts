import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameTrophyCardComponent} from './game-trophy-card.component';
import {Trophy} from "../../core/models/dto/trophy";

describe('GameTrophyCardComponent', () => {
    let component: GameTrophyCardComponent;
    let fixture: ComponentFixture<GameTrophyCardComponent>;

    const mockTrophy: Trophy = {
        id: '001',
        trophyTitle: 'Trophy 1',
        trophyDescription: 'Description 1',
        trophyType: 'platinum',
        isHidden: false,
        iconUrl: 'trophy.png',
        gameTitle: 'Game 1',
        gameGroup: 'default',
        earnedDate: null,
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GameTrophyCardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(GameTrophyCardComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('trophy', mockTrophy);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
