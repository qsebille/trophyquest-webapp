import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameSummaryComponent} from './game-summary.component';
import {GameSummary} from "../../core/models/dto/game-summary";

describe('GameSummaryComponent', () => {
    let component: GameSummaryComponent;
    let fixture: ComponentFixture<GameSummaryComponent>;

    const mockSummary: GameSummary = {
        id: '001',
        title: 'Game 1',
        platform: 'PS5',
        imageUrl: 'game.png',
        trophyCount: {platinum: 1, gold: 2, silver: 3, bronze: 4}
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GameSummaryComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(GameSummaryComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('gameSummary', mockSummary);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
