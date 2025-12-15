import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePageComponent} from './home-page.component';
import {Component, input} from '@angular/core';
import {GameListStore} from '../../core/store/game-list-store';
import {ObtainedTrophiesStore} from '../../core/store/obtained-trophies-store';
import {PlayerListStore} from '../../core/store/player-list-store';
import {NavigatorService} from "../../core/services/utils/navigator.service";

describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;

    let navigatorSpy: jasmine.SpyObj<NavigatorService>;
    let gameListStoreSpy: jasmine.SpyObj<GameListStore>;
    let obtainedTrophyStoreSpy: jasmine.SpyObj<ObtainedTrophiesStore>;
    let playerListStoreSpy: jasmine.SpyObj<PlayerListStore>;

    @Component({selector: 'app-home-summary', template: ''})
    class MockHomeSummary {
        readonly nbGames = input<number>(0);
        readonly nbPlayers = input<number>(0);
        readonly nbTrophies = input<number>(0);
    }

    @Component({selector: 'app-home-game-card', template: ''})
    class MockHomeGameCard {
    }

    @Component({selector: 'app-home-obtained-trophy-card', template: ''})
    class MockHomeLastObtainedTrophies {
    }

    const playerId: string = 'player-123';

    beforeEach(async () => {
        navigatorSpy = jasmine.createSpyObj('NavigatorService', ['goToProfilePage']);
        gameListStoreSpy = jasmine.createSpyObj('GameListStore', ['results', 'resetState', 'searchRecentlyPlayedGames', 'loadMore', 'hasMoreGames', 'isLoading', 'total']);
        obtainedTrophyStoreSpy = jasmine.createSpyObj('ObtainedTrophiesStore', ['results', 'resetState', 'search', 'loadMore', 'hasMoreTrophies', 'isLoading', 'total']);
        playerListStoreSpy = jasmine.createSpyObj('PlayerListStore', ['reset', 'count', 'total']);

        await TestBed.configureTestingModule({
            imports: [HomePageComponent, MockHomeSummary, MockHomeGameCard, MockHomeLastObtainedTrophies],
        }).compileComponents();

        TestBed.overrideComponent(HomePageComponent, {
            set: {
                imports: [MockHomeSummary, MockHomeGameCard, MockHomeLastObtainedTrophies],
                providers: [
                    {provide: NavigatorService, useValue: navigatorSpy},
                    {provide: GameListStore, useValue: gameListStoreSpy},
                    {provide: ObtainedTrophiesStore, useValue: obtainedTrophyStoreSpy},
                    {provide: PlayerListStore, useValue: playerListStoreSpy},
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

    it('should reset state on init', () => {
        expect(gameListStoreSpy.resetState).toHaveBeenCalled();
        expect(gameListStoreSpy.searchRecentlyPlayedGames).toHaveBeenCalled();
        expect(obtainedTrophyStoreSpy.resetState).toHaveBeenCalled();
        expect(obtainedTrophyStoreSpy.search).toHaveBeenCalled();
        expect(playerListStoreSpy.reset).toHaveBeenCalled();
        expect(playerListStoreSpy.count).toHaveBeenCalled();
    });

    it('should navigate to profile page', () => {
        component.navigateToProfilePage(playerId);

        expect(navigatorSpy.goToProfilePage).toHaveBeenCalledOnceWith(playerId);
    });

});
