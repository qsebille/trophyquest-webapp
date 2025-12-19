import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayerCardComponent} from './player-card.component';
import {PlayerSummary} from '../../core/models/dto/player-summary';
import {Player} from '../../core/models/dto/player';
import {TrophyCountPerType} from '../../core/models/dto/trophy-count-per-type';

describe('PlayerCardComponent', () => {
    let component: PlayerCardComponent;
    let fixture: ComponentFixture<PlayerCardComponent>;

    const mockPlayer: Player = {id: '001', pseudo: 'Pseudo', avatarUrl: 'avatar.png'}
    const mockTrophyCount: TrophyCountPerType = {platinum: 1, gold: 2, silver: 3, bronze: 4};
    const mockPlayerSummary: PlayerSummary = {
        player: mockPlayer,
        trophyCount: mockTrophyCount,
        totalGamesPlayed: 100,
        lastPlayedGameId: 'game-001',
        lastPlayedGameTitle: 'Horizon: Forbidden West',
        lastPlayedGamePlatform: 'PS5',
        lastPlayedGameImageUrl: 'horizon.png'
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlayerCardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PlayerCardComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('playerSummary', mockPlayerSummary);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
