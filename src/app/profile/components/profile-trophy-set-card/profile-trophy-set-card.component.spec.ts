import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProfileTrophySetCardComponent} from './profile-trophy-set-card.component';
import {PlayedTrophySetSearchElement} from "../../../core/api/dtos/trophy-set/played-trophy-set-search-element";

describe('ProfileTrophySetCardComponent', () => {
    let component: ProfileTrophySetCardComponent;
    let fixture: ComponentFixture<ProfileTrophySetCardComponent>;

    const mockPlayerTrophySet = {
        id: 'set-1',
        title: 'Set 1',
        platform: 'ps4',
        image: 'set.png',
        lastPlayedAt: new Date(),
        totalTrophies: 100,
        totalEarnedPlatinum: 1,
        totalEarnedGold: 10,
        totalEarnedSilver: 20,
        totalEarnedBronze: 30,
    } as PlayedTrophySetSearchElement

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileTrophySetCardComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileTrophySetCardComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('trophySet', mockPlayerTrophySet);
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
