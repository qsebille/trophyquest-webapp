import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CollectionTrophyCardComponent} from './collection-trophy-card.component';
import {Trophy} from "../../core/models/dto/trophy";

describe('CollectionTrophyCardComponent', () => {
    let component: CollectionTrophyCardComponent;
    let fixture: ComponentFixture<CollectionTrophyCardComponent>;

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
            imports: [CollectionTrophyCardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CollectionTrophyCardComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('trophy', mockTrophy);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
