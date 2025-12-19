import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PlayersPageComponent} from './players-page.component';
import {PlayerListStore} from '../../core/store/player-list-store';
import {NavigatorService} from "../../core/services/utils/navigator.service";
import {AddPlayerStore} from "../../core/store/players/add-player-store.service";
import {PlayerCardComponent} from "../../components/player-card/player-card.component";
import {AddPlayerFormComponent} from "../../components/players/add-player-form/add-player-form.component";

describe('PlayersPageComponent', () => {
    let component: PlayersPageComponent;
    let fixture: ComponentFixture<PlayersPageComponent>;

    let navigatorSpy: jasmine.SpyObj<NavigatorService>;
    let playerListStoreSpy: jasmine.SpyObj<PlayerListStore>;
    let addPlayerStoreSpy: jasmine.SpyObj<AddPlayerStore>;

    const gameId: string = 'game-123';
    const playerId: string = 'player-123';

    beforeEach(async () => {
        navigatorSpy = jasmine.createSpyObj('NavigatorService', ['goToProfilePage', 'goToPlayerGamePage']);
        playerListStoreSpy = jasmine.createSpyObj('PlayerListStore', ['reset', 'search', 'total', 'playerSummaries', 'hasMorePlayers', 'loadMore', 'isLoading', 'isError', 'isPartiallyLoaded']);
        addPlayerStoreSpy = jasmine.createSpyObj('AddPlayerStore', ['addPlayer', 'status']);

        playerListStoreSpy.playerSummaries.and.returnValue([]);

        await TestBed.configureTestingModule({
            imports: [PlayersPageComponent, PlayerCardComponent, AddPlayerFormComponent],
            providers: [
                {provide: NavigatorService, useValue: navigatorSpy},
                {provide: PlayerListStore, useValue: playerListStoreSpy},
                {provide: AddPlayerStore, useValue: addPlayerStoreSpy},
            ]
        }).compileComponents();

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

    it('should navigate to player last game page', () => {
        component.navigateToPlayerGamePage(gameId, playerId);

        expect(navigatorSpy.goToPlayerGamePage).toHaveBeenCalledWith(gameId, playerId);
    });

});
