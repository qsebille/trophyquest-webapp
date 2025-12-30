import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {GameTrophiesStore} from './game-trophies-store.service';
import {PlayerService} from '../../core/services/http/player.service';
import {Trophy} from '../../core/models/dto/trophy';
import {of, throwError} from "rxjs";
import {GameService} from "../../core/services/http/game.service";
import {LoadingStatus} from "../../core/models/loading-status.enum";

describe('GameTrophiesStore', () => {
    let store: GameTrophiesStore;

    let playerServiceSpy: jasmine.SpyObj<PlayerService>;
    let gameServiceSpy: jasmine.SpyObj<GameService>;

    const gameId = '123';
    const playerId = '456';
    const trophies: Trophy[] = [
        {
            id: 'trophy-1',
            trophyTitle: 'Trophy 1',
        } as Trophy,
        {
            id: 'trophy-2',
            trophyTitle: 'Trophy 2',
        } as Trophy,
    ]

    beforeEach(() => {
        playerServiceSpy = jasmine.createSpyObj('PlayerService', ['fetchGameTrophies']);
        gameServiceSpy = jasmine.createSpyObj('GameService', ['getTrophies']);

        TestBed.configureTestingModule({
            providers: [
                {provide: PlayerService, useValue: playerServiceSpy},
                {provide: GameService, useValue: gameServiceSpy},
            ]
        });

        store = TestBed.inject(GameTrophiesStore);

        // Mock player service
        playerServiceSpy.fetchGameTrophies
            .withArgs(playerId, gameId)
            .and.returnValue(of(trophies));
        playerServiceSpy.fetchGameTrophies
            .and.returnValue(throwError(() => new Error('Not Found')));
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });

    it('should retrieve game trophies when game id and player id are provided', fakeAsync(() => {
        store.retrieveForPlayer(gameId, playerId);
        flushMicrotasks();

        expect(store.trophies()).toEqual(trophies);
        expect(store.status()).toEqual(LoadingStatus.FULLY_LOADED);
    }));

    it('should fail retrieve game trophies without player data when game id is null', () => {
        store.retrieveForGame(null);

        expect(gameServiceSpy.getTrophies).not.toHaveBeenCalled();
        expect(store.status()).toEqual(LoadingStatus.ERROR);
    });

    it('should fail retrieve game trophies with player data when game id is null', () => {
        store.retrieveForPlayer(null, playerId);

        expect(playerServiceSpy.fetchGameTrophies).not.toHaveBeenCalled();
        expect(store.status()).toEqual(LoadingStatus.ERROR);
    });

    it('should fail retrieve game trophies with player data when player id is null', () => {
        store.retrieveForPlayer(gameId, null);

        expect(playerServiceSpy.fetchGameTrophies).not.toHaveBeenCalled();
        expect(store.status()).toEqual(LoadingStatus.ERROR);
    });

    it('should reset state when reset is called', fakeAsync(() => {
        store.retrieveForPlayer(gameId, playerId);
        flushMicrotasks();
        store.reset();

        expect(store.trophies()).toEqual([]);
        expect(store.status()).toEqual(LoadingStatus.NONE);
    }));

});
