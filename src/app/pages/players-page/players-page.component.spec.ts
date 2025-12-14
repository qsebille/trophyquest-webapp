import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PlayersPageComponent} from './players-page.component';
import {PlayerListStore} from '../../core/store/player-list-store';
import {PlayerSummary} from '../../core/models/dto/player-summary';
import {Component, input, output} from '@angular/core';
import {NavigatorService} from "../../core/services/utils/navigator.service";

describe('PlayersPageComponent', () => {
    let component: PlayersPageComponent;
    let fixture: ComponentFixture<PlayersPageComponent>;

    let navigatorSpy: jasmine.SpyObj<NavigatorService>;
    let playerListStoreSpy: jasmine.SpyObj<PlayerListStore>;

    @Component({selector: 'app-player-card', template: ''})
    class MockPlayerCard {
        readonly playerSummary = input.required<PlayerSummary>();
        readonly clickOnPseudo = output();
        readonly clickOnGame = output();
    }

    const collectionId: string = 'collection-123';
    const playerId: string = 'player-123';

    beforeEach(async () => {
        navigatorSpy = jasmine.createSpyObj('NavigatorService', ['goToProfilePage', 'goToPlayerCollectionPage']);
        playerListStoreSpy = jasmine.createSpyObj('PlayerListStore', ['reset', 'search', 'playerSummaries', 'hasMorePlayers', 'loadMore', 'isLoading', 'isError']);

        playerListStoreSpy.playerSummaries.and.returnValue([]);

        await TestBed.configureTestingModule({
            imports: [PlayersPageComponent, MockPlayerCard],
            providers: [
                {provide: NavigatorService, useValue: navigatorSpy},
                {provide: PlayerListStore, useValue: playerListStoreSpy},
            ]
        }).compileComponents();
        TestBed.overrideComponent(PlayersPageComponent, {set: {imports: [MockPlayerCard]}});

        fixture = TestBed.createComponent(PlayersPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should reset search on init', () => {
        expect(playerListStoreSpy.reset).toHaveBeenCalled();
        expect(playerListStoreSpy.search).toHaveBeenCalled();
    });

    it('should navigate to profile page', () => {
        component.navigateToProfilePage(playerId);

        expect(navigatorSpy.goToProfilePage).toHaveBeenCalledOnceWith(playerId);
    });

    it('should navigate to player last collection page', () => {
        component.navigateToPlayerCollectionPage(collectionId, playerId);

        expect(navigatorSpy.goToPlayerCollectionPage).toHaveBeenCalledWith(collectionId, playerId);
    });

});
