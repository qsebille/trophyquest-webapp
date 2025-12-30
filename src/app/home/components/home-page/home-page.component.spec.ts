import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePageComponent} from './home-page.component';
import {NavigatorService} from "../../../core/services/navigator.service";
import {HomeSummaryStoreService} from "../../stores/home-summary-store.service";
import {HomeRecentPlayerStoreService} from "../../stores/home-recent-player-store.service";
import {HomePopularGamesStore} from "../../stores/home-popular-games-store.service";
import {HomeGameCardComponent} from "../home-game-card/home-game-card.component";

describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;

    let homeSummaryStoreSpy: jasmine.SpyObj<HomeSummaryStoreService>;
    let homeRecentPlayerStoreSpy: jasmine.SpyObj<HomeRecentPlayerStoreService>;
    let homeGameStoreSpy: jasmine.SpyObj<HomePopularGamesStore>;
    let navigatorSpy: jasmine.SpyObj<NavigatorService>;

    const gameId: string = 'game-123';
    const playerId: string = 'player-123';

    beforeEach(async () => {
        homeSummaryStoreSpy = jasmine.createSpyObj('HomeSummaryStoreService', ['fetch', 'nbGames', 'nbPlayers', 'nbEarnedTrophies', 'status']);
        homeRecentPlayerStoreSpy = jasmine.createSpyObj('HomeRecentPlayerStoreService', ['fetch', 'players', 'status']);
        homeGameStoreSpy = jasmine.createSpyObj('HomeGameStoreService', ['fetch', 'games', 'status']);
        navigatorSpy = jasmine.createSpyObj('NavigatorService', ['goToProfilePage', 'goToPlayersPage', 'goToGamePage', 'goToPlayerGamePage']);

        await TestBed.configureTestingModule({
            imports: [HomeGameCardComponent],
        }).compileComponents();

        homeGameStoreSpy.games.and.returnValue([]);
        homeRecentPlayerStoreSpy.players.and.returnValue([]);

        TestBed.overrideComponent(HomePageComponent, {
            set: {
                providers: [
                    {provide: HomeSummaryStoreService, useValue: homeSummaryStoreSpy},
                    {provide: HomeRecentPlayerStoreService, useValue: homeRecentPlayerStoreSpy},
                    {provide: HomePopularGamesStore, useValue: homeGameStoreSpy},
                    {provide: NavigatorService, useValue: navigatorSpy},
                ],
            }
        });

        fixture = TestBed.createComponent(HomePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch store data on init', () => {
        expect(homeSummaryStoreSpy.fetch).toHaveBeenCalled();
        expect(homeRecentPlayerStoreSpy.fetch).toHaveBeenCalled();
        expect(homeGameStoreSpy.fetch).toHaveBeenCalled();
    });

    it('should navigate to players page', () => {
        component.navigateToPlayersPage();
        expect(navigatorSpy.goToPlayersPage).toHaveBeenCalled();
    });

    it('should navigate to profile page', () => {
        component.navigateToProfilePage(playerId);
        expect(navigatorSpy.goToProfilePage).toHaveBeenCalledOnceWith(playerId);
    });

    it('should navigate to game page', () => {
        component.navigateToGamePage(gameId);
        expect(navigatorSpy.goToGamePage).toHaveBeenCalledWith(gameId);
    });

    it('should navigate to player game page', () => {
        component.navigateToPlayerGamePage(gameId, playerId);
        expect(navigatorSpy.goToPlayerGamePage).toHaveBeenCalledWith(gameId, playerId)
    });
});
