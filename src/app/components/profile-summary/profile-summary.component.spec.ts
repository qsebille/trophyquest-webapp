import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileSummaryComponent} from './profile-summary.component';

describe('ProfileSummaryComponent', () => {
    let component: ProfileSummaryComponent;
    let fixture: ComponentFixture<ProfileSummaryComponent>;

    const mockPlayer = {id: '001', pseudo: 'Pseudo', avatarUrl: 'avatar.png'};
    const mockTrophyCount = {platinum: 1, gold: 2, silver: 3, bronze: 4};
    const mockTotalGamesPlayed = 100;
    const mockTotalTrophiesEarned = 1000;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileSummaryComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProfileSummaryComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('player', mockPlayer);
        fixture.componentRef.setInput('trophyCount', mockTrophyCount);
        fixture.componentRef.setInput('totalGamesPlayed', mockTotalGamesPlayed);
        fixture.componentRef.setInput('totalEarnedTrophies', mockTotalTrophiesEarned);
        
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
