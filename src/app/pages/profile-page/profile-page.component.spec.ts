import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilePageComponent} from './profile-page.component';
import {ActivatedRoute} from '@angular/router';
import {NavigatorService} from "../../core/services/navigator.service";
import {ProfileSummaryComponent} from "../../components/profile-summary/profile-summary.component";
import {ProfileTrophyCardComponent} from "../../components/profile-trophy-card/profile-trophy-card.component";
import {ProfileSummaryStore} from "../../core/store/profile/profile-summary-store.service";
import {ProfileGamesStore} from "../../core/store/profile/profile-games-store.service";
import {ProfileTrophiesStore} from "../../core/store/profile/profile-trophies-store.service";
import {EMPTY_TROPHY_COUNT_PER_TYPE} from "../../core/models/dto/trophy-count-per-type";

describe('ProfilePageComponent', () => {
    let component: ProfilePageComponent;
    let fixture: ComponentFixture<ProfilePageComponent>;
    let profileSummaryStoreSpy: jasmine.SpyObj<ProfileSummaryStore>;
    let profileGamesStoreSpy: jasmine.SpyObj<ProfileGamesStore>;
    let profileTrophiesStoreSpy: jasmine.SpyObj<ProfileTrophiesStore>;
    let navigatorSpy: jasmine.SpyObj<NavigatorService>;

    const playerId: string = 'player-123';
    const gameId: string = 'game-123';

    beforeEach(async () => {
        navigatorSpy = jasmine.createSpyObj('NavigatorService', ['goToPlayerGamePage']);
        profileSummaryStoreSpy = jasmine.createSpyObj('ProfileSummaryStore', ['retrieve', 'reset', 'player', 'gameCount', 'trophyCountPerType', 'isLoading', 'isError']);
        profileGamesStoreSpy = jasmine.createSpyObj('ProfileGamesStore', ['searchGames', 'reset', 'games', 'isLoading', 'isError', 'isPartiallyLoaded']);
        profileTrophiesStoreSpy = jasmine.createSpyObj('ProfileTrophiesStore', ['searchTrophies', 'reset', 'trophies', 'isLoading', 'isError', 'isPartiallyLoaded']);

        const routeParamMap = new Map<string, string>();
        routeParamMap.set('playerId', playerId);

        await TestBed.configureTestingModule({
            imports: [ProfilePageComponent, ProfileSummaryComponent, ProfileTrophyCardComponent],
            providers: [
                {provide: NavigatorService, useValue: navigatorSpy},
                {provide: ProfileSummaryStore, useValue: profileSummaryStoreSpy},
                {provide: ProfileGamesStore, useValue: profileGamesStoreSpy},
                {provide: ProfileTrophiesStore, useValue: profileTrophiesStoreSpy},
                {provide: ActivatedRoute, useValue: {snapshot: {paramMap: routeParamMap}}},
            ]
        }).compileComponents();

        profileSummaryStoreSpy.trophyCountPerType.and.returnValue(EMPTY_TROPHY_COUNT_PER_TYPE);

        fixture = TestBed.createComponent(ProfilePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch profile infos on init', () => {
        expect(profileSummaryStoreSpy.reset).toHaveBeenCalled();
        expect(profileSummaryStoreSpy.retrieve).toHaveBeenCalledWith(playerId);
        expect(profileGamesStoreSpy.reset).toHaveBeenCalled();
        expect(profileGamesStoreSpy.searchGames).toHaveBeenCalledWith(playerId);
        expect(profileTrophiesStoreSpy.reset).toHaveBeenCalled();
        expect(profileTrophiesStoreSpy.searchTrophies).toHaveBeenCalledWith(playerId);
    });

    it('should navigate to game page when clicking on game card', () => {
        component.navigateToPlayerGamePage(gameId);

        expect(navigatorSpy.goToPlayerGamePage).toHaveBeenCalledOnceWith(gameId, playerId);
    });

});
