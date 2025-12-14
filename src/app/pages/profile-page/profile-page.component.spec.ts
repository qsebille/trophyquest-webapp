import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilePageComponent} from './profile-page.component';
import {ActivatedRoute} from '@angular/router';
import {ProfileStore} from '../../core/store/profile-store';
import {Component, input} from '@angular/core';
import {TrophyCount} from '../../core/models/dto/trophy-count';
import {Player} from '../../core/models/dto/player';
import {Trophy} from '../../core/models/dto/trophy';
import {NavigatorService} from "../../core/services/utils/navigator.service";

describe('ProfilePageComponent', () => {
    let component: ProfilePageComponent;
    let fixture: ComponentFixture<ProfilePageComponent>;
    let profileStoreSpy: jasmine.SpyObj<ProfileStore>;
    let navigatorSpy: jasmine.SpyObj<NavigatorService>;

    @Component({selector: 'app-profile-summary', template: ''})
    class MockProfileSummary {
        readonly player = input.required<Player>();
        readonly trophyCount = input.required<TrophyCount>();
        readonly totalGamesPlayed = input.required<number>();
        readonly totalEarnedTrophies = input.required<number>();
    }

    @Component({selector: 'app-profile-trophy-card', template: ''})
    class MockProfileTrophyCard {
        readonly trophy = input.required<Trophy>();
    }

    const playerId: string = 'player-123';
    const collectionId: string = 'collection-123';

    beforeEach(async () => {
        navigatorSpy = jasmine.createSpyObj('NavigatorService', ['goToPlayerCollectionPage']);
        profileStoreSpy = jasmine.createSpyObj('ProfileStore', [
            'reset', 'retrieve',
            'player', 'trophyCount', 'totalPlayedGames', 'totalEarnedTrophies',
            'collections', 'searchCollections', 'loadMoreCollections', 'hasMoreCollections', 'hasNoCollections', 'isLoadingCollections', 'hasErrorLoadingCollections',
            'trophies', 'searchTrophies', 'loadMoreTrophies', 'hasMoreTrophies', 'hasNoTrophies', 'isLoadingTrophies', 'hasErrorLoadingTrophies',
        ]);

        const routeParamMap = new Map<string, string>();
        routeParamMap.set('playerId', playerId);

        await TestBed.configureTestingModule({
            imports: [ProfilePageComponent, MockProfileSummary, MockProfileTrophyCard],
            providers: [
                {provide: NavigatorService, useValue: navigatorSpy},
                {provide: ProfileStore, useValue: profileStoreSpy},
                {provide: ActivatedRoute, useValue: {snapshot: {paramMap: routeParamMap}}},
            ]
        }).compileComponents();

        TestBed.overrideComponent(ProfilePageComponent, {
            set: {imports: [MockProfileSummary, MockProfileSummary, MockProfileTrophyCard]}
        });

        fixture = TestBed.createComponent(ProfilePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch profile infos on init', () => {
        expect(profileStoreSpy.reset).toHaveBeenCalled();
        expect(profileStoreSpy.retrieve).toHaveBeenCalledWith(playerId);
        expect(profileStoreSpy.searchCollections).toHaveBeenCalledWith(playerId);
        expect(profileStoreSpy.searchTrophies).toHaveBeenCalledWith(playerId);
    });

    it('should navigate to game page when clicking on game card', () => {
        component.navigateToPlayerCollectionPage(collectionId);

        expect(navigatorSpy.goToPlayerCollectionPage).toHaveBeenCalledOnceWith(collectionId, playerId);
    });

});
