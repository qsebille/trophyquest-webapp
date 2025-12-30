import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilePageComponent} from './profile-page.component';
import {ActivatedRoute} from '@angular/router';
import {NavigatorService} from "../../../core/services/navigator.service";
import {ProfileSummaryComponent} from "../profile-summary/profile-summary.component";
import {ProfileTrophyCardComponent} from "../profile-trophy-card/profile-trophy-card.component";
import {ProfileSummaryStore} from "../../stores/profile-summary-store.service";
import {ProfileGamesStore} from "../../stores/profile-games-store.service";
import {ProfileTrophiesStore} from "../../stores/profile-trophies-store.service";
import {EMPTY_TROPHY_COUNT_PER_TYPE} from "../../../core/models/dto/trophy-count-per-type";
import {EMPTY_PLAYER} from "../../../core/models/dto/player";

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
        profileSummaryStoreSpy = jasmine.createSpyObj('ProfileSummaryStore', ['retrieve', 'reset', 'player', 'totalGames', 'trophyCountPerType', 'status']);
        profileGamesStoreSpy = jasmine.createSpyObj('ProfileGamesStore', ['searchGames', 'reset', 'games', 'status']);
        profileTrophiesStoreSpy = jasmine.createSpyObj('ProfileTrophiesStore', ['searchTrophies', 'reset', 'trophies', 'status']);

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
        profileSummaryStoreSpy.player.and.returnValue(EMPTY_PLAYER);

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
