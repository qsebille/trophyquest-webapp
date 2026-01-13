import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePageComponent} from './home-page.component';
import {NavigatorService} from "../../../core/services/navigator.service";
import {HomeStatsStore} from "../../stores/home-stats-store.service";
import {HomeRecentPlayersStore} from "../../stores/home-recent-players-store.service";
import {HomeRecentTrophySetsStore} from "../../stores/home-recent-trophy-sets-store.service";

describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;

    let statsStoreSpy: jasmine.SpyObj<HomeStatsStore>;
    let recentPlayersStoreSpy: jasmine.SpyObj<HomeRecentPlayersStore>;
    let recentTrophySetsStoreSpy: jasmine.SpyObj<HomeRecentTrophySetsStore>;
    let navigatorSpy: jasmine.SpyObj<NavigatorService>;

    const gameId: string = 'game-123';
    const playerId: string = 'player-123';

    beforeEach(async () => {
        statsStoreSpy = jasmine.createSpyObj('HomeStatsStore', ['retrieve', 'playerCount', 'trophySetCount', 'trophyCount', 'recentPlayerCount', 'recentTrophySetCount', 'recentTrophyCount', 'status']);
        recentPlayersStoreSpy = jasmine.createSpyObj('HomeRecentPlayersStore', ['fetch', 'players', 'status']);
        recentTrophySetsStoreSpy = jasmine.createSpyObj('HomeRecentTrophySetsStore', ['fetch', 'trophySets', 'status']);
        navigatorSpy = jasmine.createSpyObj('NavigatorService', ['goToPlayersPage', 'goToProfilePage', 'goToTrophySetPage', 'goToPlayerTrophySetPage']);

        recentPlayersStoreSpy.players.and.returnValue([]);
        recentTrophySetsStoreSpy.trophySets.and.returnValue([]);

        await TestBed.configureTestingModule({}).compileComponents();

        TestBed.overrideComponent(HomePageComponent, {
            set: {
                providers: [
                    {provide: HomeStatsStore, useValue: statsStoreSpy},
                    {provide: HomeRecentPlayersStore, useValue: recentPlayersStoreSpy},
                    {provide: HomeRecentTrophySetsStore, useValue: recentTrophySetsStoreSpy},
                    {provide: NavigatorService, useValue: navigatorSpy},
                ],
            }
        });

        fixture = TestBed.createComponent(HomePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());

    it('should fetch store data on init', () => {
        expect(statsStoreSpy.retrieve).toHaveBeenCalled();
        expect(recentPlayersStoreSpy.fetch).toHaveBeenCalled();
        expect(recentTrophySetsStoreSpy.fetch).toHaveBeenCalled();
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
        component.navigateToTrophySetPage(gameId);
        expect(navigatorSpy.goToTrophySetPage).toHaveBeenCalledWith(gameId);
    });

    it('should navigate to player game page', () => {
        component.navigateToPlayerTrophySetPage(gameId, playerId);
        expect(navigatorSpy.goToPlayerTrophySetPage).toHaveBeenCalledWith(gameId, playerId)
    });
});
