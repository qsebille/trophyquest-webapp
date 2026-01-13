import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrophySetPageComponent} from './trophy-set-page.component';
import {TrophySetStore} from "../../stores/trophy-set-store.service";
import {ActivatedRoute} from "@angular/router";
import {TrophySet} from "../../../core/api/dtos/trophy-set/trophy-set";

describe('TrophySetPageComponent', () => {
    let component: TrophySetPageComponent;
    let fixture: ComponentFixture<TrophySetPageComponent>;

    let trophySetStoreSpy: jasmine.SpyObj<TrophySetStore>;

    const trophySet = {id: 'trophy-set-123', title: 'Trophy Set 123', platform: 'ps5', image: 'ts.png'} as TrophySet;
    const mockPlayerId = 'player-123';

    beforeEach(async () => {
        trophySetStoreSpy = jasmine.createSpyObj('TrophySetStore', [
                'reset',
                'retrieve',
                'trophySet',
                'trophies',
                'status',
            ]
        );
        const routeParamMap = new Map<string, string>();
        routeParamMap.set('trophySetId', trophySet.id);
        const routeQueryParamMap = new Map<string, string>();
        routeQueryParamMap.set('playerId', mockPlayerId);

        trophySetStoreSpy.trophySet.and.returnValue(trophySet);
        trophySetStoreSpy.trophies.and.returnValue([]);

        await TestBed.configureTestingModule({
            imports: [TrophySetPageComponent],
            providers: [
                {provide: TrophySetStore, useValue: trophySetStoreSpy},
                {
                    provide: ActivatedRoute,
                    useValue: {snapshot: {paramMap: routeParamMap, queryParamMap: routeQueryParamMap}}
                },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TrophySetPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
