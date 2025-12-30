import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameTrophyListComponent} from './game-trophy-list.component';
import {Trophy} from "../../../core/models/dto/trophy";
import {GameGroupTrophies} from "../../../core/models/dto/game-group-trophies";

describe('GameTrophyListComponent', () => {
    let component: GameTrophyListComponent;
    let fixture: ComponentFixture<GameTrophyListComponent>;

    const mockTrophy1 = {
        id: 'default-001',
        iconUrl: '1.png',
        gameGroup: 'default',
        earnedDate: new Date().toISOString()
    } as Trophy
    const mockTrophy2 = {id: 'default-002', iconUrl: '2.png', gameGroup: 'default', earnedDate: null} as Trophy
    const mockTrophy3 = {
        id: 'default-003',
        iconUrl: '3.png',
        gameGroup: '001',
        earnedDate: new Date().toISOString()
    } as Trophy
    const mockTrophy4 = {id: 'default-004', iconUrl: '4.png', gameGroup: '001', earnedDate: null} as Trophy
    const mockTrophies = [mockTrophy1, mockTrophy2, mockTrophy3, mockTrophy4];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GameTrophyListComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(GameTrophyListComponent);
        fixture.componentRef.setInput('trophies', mockTrophies);
        fixture.componentRef.setInput('trophyFilters', {
            showHidden: false,
            earned: 'all',
        });
        fixture.detectChanges();

        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should compute base game trophies and dlcs', () => {
        expect(component.baseGameTrophies()).toEqual([mockTrophy1, mockTrophy2]);
        expect(component.dlcs()).toEqual([
            {
                groupName: '001',
                trophies: [mockTrophy3, mockTrophy4],
            } as GameGroupTrophies
        ]);
    });

    it('should display all trophies if earned filter is "all"', () => {
        fixture.componentRef.setInput('trophyFilters', {
            showHidden: false,
            earned: 'all'
        });

        expect(component.baseGameTrophies()).toEqual([mockTrophy1, mockTrophy2]);
        expect(component.dlcs()).toEqual([
            {
                groupName: '001',
                trophies: [mockTrophy3, mockTrophy4],
            } as GameGroupTrophies
        ]);
    });

    it('should display earned trophies if earned filter is "earned"', () => {
        fixture.componentRef.setInput('trophyFilters', {
            showHidden: false,
            earned: 'earned'
        });

        expect(component.baseGameTrophies()).toEqual([mockTrophy1]);
        expect(component.dlcs()).toEqual([
            {
                groupName: '001',
                trophies: [mockTrophy3],
            } as GameGroupTrophies
        ]);
    });

    it('should display unearned trophies if earned filter is "notEarned"', () => {
        fixture.componentRef.setInput('trophyFilters', {
            showHidden: false,
            earned: 'notEarned'
        });
        fixture.detectChanges();


        expect(component.baseGameTrophies()).toEqual([mockTrophy2]);
        expect(component.dlcs()).toEqual([
            {
                groupName: '001',
                trophies: [mockTrophy4],
            } as GameGroupTrophies
        ]);
    });
});
