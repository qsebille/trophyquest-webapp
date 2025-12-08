import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PlayersPage} from './players-page.component';
import {PlayerListStore} from '../../core/store/player-list-store';
import {PlayerSummary} from '../../core/models/dto/player-summary';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavigatorService} from "../../core/services/utils/navigator.service";

describe('PlayersPage', () => {
    let component: PlayersPage;
    let fixture: ComponentFixture<PlayersPage>;

    let navigatorSpy: jasmine.SpyObj<NavigatorService>;
    let playerListStoreSpy: jasmine.SpyObj<PlayerListStore>;

    @Component({selector: 'app-player-card', template: ''})
    class MockPlayerCard {
        @Input({required: true}) playerSummary!: PlayerSummary;
        @Output() clickOnPseudo: EventEmitter<any> = new EventEmitter();
        @Output() clickOnGame: EventEmitter<any> = new EventEmitter();
    }

    const collectionId: string = 'collection-123';
    const playerId: string = 'player-123';

    beforeEach(async () => {
        navigatorSpy = jasmine.createSpyObj('NavigatorService', ['goToProfilePage', 'goToPlayerCollectionPage']);
        playerListStoreSpy = jasmine.createSpyObj('PlayerListStore', ['reset', 'search', 'playerSummaries', 'hasMorePlayers', 'loadMore', 'isLoading', 'isError']);

        playerListStoreSpy.playerSummaries.and.returnValue([]);

        await TestBed.configureTestingModule({
            imports: [PlayersPage, MockPlayerCard],
            providers: [
                {provide: NavigatorService, useValue: navigatorSpy},
                {provide: PlayerListStore, useValue: playerListStoreSpy},
            ]
        }).compileComponents();
        TestBed.overrideComponent(PlayersPage, {set: {imports: [MockPlayerCard]}});

        fixture = TestBed.createComponent(PlayersPage);
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
