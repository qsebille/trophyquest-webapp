import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeTrophySetCardComponent} from './home-trophy-set-card.component';
import {RecentTrophySet} from "../../../core/api/dtos/trophy-set/recent-trophy-set";

describe('HomeTrophySetCardComponent', () => {
    let component: HomeTrophySetCardComponent;
    let fixture: ComponentFixture<HomeTrophySetCardComponent>;

    const mockTrophySet = {id: '001', title: 'Trophy Set 1', image: 'trophy.png'} as RecentTrophySet;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeTrophySetCardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HomeTrophySetCardComponent);
        fixture.componentRef.setInput('trophySet', mockTrophySet);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
