import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePageComponent} from './home-page.component';
import {NavigatorService} from "../../core/services/utils/navigator.service";
import {HomeSummaryStoreService} from "../../core/store/home/home-summary-store.service";
import {HomeRecentPlayerStoreService} from "../../core/store/home/home-recent-player-store.service";
import {HomePopularGamesStore} from "../../core/store/home/home-popular-games-store.service";
import {HomeGameCardComponent} from "../../components/home-game-card/home-game-card.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HomeSummaryComponent} from "../../components/home-summary/home-summary.component";
import {SectionListComponent} from "../../components/section-list/section-list.component";
import {SectionListContentTemplate, SectionListHeaderTemplate} from "../../templates/section-list.template";
import {HomeTrophyCardComponent} from "../../components/home-trophy-card/home-trophy-card.component";
import {ErrorMessageComponent} from "../../components/utils/error-message/error-message.component";
import {TrophyquestBlockComponent} from "../../components/trophyquest-block/trophyquest-block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../templates/block.template";
import {HomePlayerCardComponent} from "../../components/home-player-card/home-player-card.component";

describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;

    let homeSummaryStoreSpy: jasmine.SpyObj<HomeSummaryStoreService>;
    let homeRecentPlayerStoreSpy: jasmine.SpyObj<HomeRecentPlayerStoreService>;
    let homeGameStoreSpy: jasmine.SpyObj<HomePopularGamesStore>;
    let navigatorSpy: jasmine.SpyObj<NavigatorService>;

    const playerId: string = 'player-123';

    beforeEach(async () => {
        homeSummaryStoreSpy = jasmine.createSpyObj('HomeSummaryStoreService', ['fetch', 'nbGames', 'nbPlayers', 'nbEarnedTrophies', 'isLoading', 'isError']);
        homeRecentPlayerStoreSpy = jasmine.createSpyObj('HomeRecentPlayerStoreService', ['fetch', 'list', 'isLoading', 'isError']);
        homeGameStoreSpy = jasmine.createSpyObj('HomeGameStoreService', ['fetch', 'games', 'isLoading', 'isError']);
        navigatorSpy = jasmine.createSpyObj('NavigatorService', ['goToProfilePage']);

        await TestBed.configureTestingModule({
            imports: [
                HomeGameCardComponent,
                MatProgressSpinnerModule,
                HomeSummaryComponent,
                SectionListComponent,
                SectionListHeaderTemplate,
                SectionListContentTemplate,
                HomeTrophyCardComponent,
                ErrorMessageComponent,
                TrophyquestBlockComponent,
                BlockHeaderTemplate,
                BlockContentTemplate,
                HomePlayerCardComponent,
            ],
        }).compileComponents();

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

    it('should navigate to profile page', () => {
        component.navigateToProfilePage(playerId);

        expect(navigatorSpy.goToProfilePage).toHaveBeenCalledOnceWith(playerId);
    });

});
