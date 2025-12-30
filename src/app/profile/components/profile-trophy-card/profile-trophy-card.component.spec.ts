import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProfileTrophyCardComponent} from './profile-trophy-card.component';
import {Trophy} from '../../../core/models/dto/trophy';

describe('ProfileTrophyCardComponent', () => {
    let component: ProfileTrophyCardComponent;
    let fixture: ComponentFixture<ProfileTrophyCardComponent>;

    const trophyMock: Trophy = {
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
            imports: [ProfileTrophyCardComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileTrophyCardComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('trophy', trophyMock);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
