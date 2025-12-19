import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProfileGameCardComponent} from './profile-game-card.component';
import {PlayerGame} from '../../core/models/dto/player-game';

describe('ProfileGameCardComponent', () => {
    let component: ProfileGameCardComponent;
    let fixture: ComponentFixture<ProfileGameCardComponent>;

    const mockPlayerGame: PlayerGame = {
        id: 'game-001',
        title: 'Game 1',
        platform: 'PS5',
        imageUrl: 'game.png',
        totalTrophies: {platinum: 1, gold: 2, silver: 3, bronze: 4},
        earnedTrophies: {platinum: 1, gold: 2, silver: 3, bronze: 4}
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileGameCardComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileGameCardComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('game', mockPlayerGame);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
