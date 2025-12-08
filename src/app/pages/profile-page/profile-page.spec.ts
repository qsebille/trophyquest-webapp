import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilePage} from './profile-page';
import {ActivatedRoute} from '@angular/router';
import {ProfileStore} from '../../core/store/profile-store';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TrophyCount} from '../../core/models/dto/trophy-count';
import {Player} from '../../core/models/dto/player';
import {PlayerCollection} from '../../core/models/dto/player-collection';
import {Trophy} from '../../core/models/dto/trophy';
import {NavigatorService} from "../../core/services/utils/navigator.service";

describe('ProfilePage', () => {
    let component: ProfilePage;
    let fixture: ComponentFixture<ProfilePage>;
    let profileStoreSpy: jasmine.SpyObj<ProfileStore>;
    let navigatorSpy: jasmine.SpyObj<NavigatorService>;

    @Component({selector: 'app-profile-summary', template: ''})
    class MockProfileSummary {
        @Input({required: true}) player!: Player;
        @Input({required: true}) trophyCount!: TrophyCount;
        @Input({required: true}) totalGamesPlayed!: number;
        @Input({required: true}) totalEarnedTrophies!: number;
    }

    @Component({selector: 'app-profile-game-card', template: ''})
    class MockProfileGameCard {
        @Input({required: true}) collection!: PlayerCollection;
        @Output() public readonly clickOnTitle = new EventEmitter();
    }

    @Component({selector: 'app-profile-trophy-card', template: ''})
    class MockProfileTrophyCard {
        @Input({required: true}) trophy!: Trophy;
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
            imports: [ProfilePage, MockProfileSummary, MockProfileGameCard, MockProfileTrophyCard],
            providers: [
                {provide: NavigatorService, useValue: navigatorSpy},
                {provide: ProfileStore, useValue: profileStoreSpy},
                {provide: ActivatedRoute, useValue: {snapshot: {paramMap: routeParamMap}}},
            ]
        }).compileComponents();

        TestBed.overrideComponent(ProfilePage, {
            set: {imports: [MockProfileSummary, MockProfileSummary, MockProfileGameCard, MockProfileTrophyCard]}
        });

        fixture = TestBed.createComponent(ProfilePage);
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
