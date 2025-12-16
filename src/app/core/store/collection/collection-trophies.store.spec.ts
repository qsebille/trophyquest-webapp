import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {CollectionTrophiesStore} from './collection-trophies.store';
import {PlayerService} from '../../services/http/player.service';
import {Trophy} from '../../models/dto/trophy';
import {of, throwError} from "rxjs";

describe('CollectionTrophiesStore', () => {
    let store: CollectionTrophiesStore;

    let playerServiceSpy: jasmine.SpyObj<PlayerService>;

    const collectionId = '123';
    const playerId = '456';
    const baseTrophy: Trophy = {
        id: 'trophy-1',
        trophyTitle: 'Trophy 1',
        trophyDescription: 'desc',
        trophyType: 'gold',
        iconUrl: 'img.png',
        isHidden: false,
        gameTitle: 'Game',
        gameGroup: 'default',
        earnedDate: null,
    }
    const earnedBaseTrophy: Trophy = {
        id: 'trophy-2',
        trophyTitle: 'Trophy 2',
        trophyDescription: 'desc',
        trophyType: 'gold',
        iconUrl: 'img.png',
        isHidden: false,
        gameTitle: 'Game',
        gameGroup: 'default',
        earnedDate: new Date().toISOString(),
    }
    const dlcTrophy: Trophy = {
        id: 'trophy-3',
        trophyTitle: 'Trophy 3',
        trophyDescription: 'desc',
        trophyType: 'gold',
        iconUrl: 'img.png',
        isHidden: false,
        gameTitle: 'Game',
        gameGroup: 'dlc',
        earnedDate: null,
    }
    const earnedDlcTrophy: Trophy = {
        id: 'trophy-4',
        trophyTitle: 'Trophy 4',
        trophyDescription: 'desc',
        trophyType: 'gold',
        iconUrl: 'img.png',
        isHidden: false,
        gameTitle: 'Game',
        gameGroup: 'dlc',
        earnedDate: new Date().toISOString(),
    }
    const trophies: Trophy[] = [baseTrophy, earnedBaseTrophy, dlcTrophy, earnedDlcTrophy];

    beforeEach(() => {
        playerServiceSpy = jasmine.createSpyObj('PlayerService', ['retrieveCollectionTrophies']);

        TestBed.configureTestingModule({
            providers: [
                {provide: PlayerService, useValue: playerServiceSpy},
            ]
        });

        store = TestBed.inject(CollectionTrophiesStore);

        // Mock player service
        playerServiceSpy.retrieveCollectionTrophies
            .withArgs(playerId, collectionId)
            .and.returnValue(of(trophies));
        playerServiceSpy.retrieveCollectionTrophies
            .and.returnValue(throwError(() => new Error('Not Found')));
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });

    it('should retrieve collection trophies when collection id and player id are provided', fakeAsync(() => {
        store.retrieve(collectionId, playerId);
        flushMicrotasks();

        expect(store.isLoading()).toBeFalse();
        expect(store.isError()).toBeFalse();
        expect(store.isLoaded()).toBeTrue();
        expect(store.displayedTrophies()).toEqual(trophies);
        expect(store.baseGameTrophies()).toEqual([baseTrophy, earnedBaseTrophy]);
        expect(store.dlcs()).toEqual([{groupName: 'dlc', trophies: [dlcTrophy, earnedDlcTrophy]}]);
    }));

    it('should fail retrieve collection trophies when collection id is null', () => {
        store.retrieve(null, playerId);

        expect(playerServiceSpy.retrieveCollectionTrophies).not.toHaveBeenCalled();
        expect(store.isError()).toBeTrue();
    });

    it('should fail retrieve collection trophies when player id is null', () => {
        store.retrieve(collectionId, null);

        expect(playerServiceSpy.retrieveCollectionTrophies).not.toHaveBeenCalled();
        expect(store.isError()).toBeTrue();
    });

    it('should reset state when reset is called', fakeAsync(() => {
        store.retrieve(collectionId, playerId);
        flushMicrotasks();
        store.reset();

        expect(store.isLoading()).toBeFalse();
        expect(store.isError()).toBeFalse();
        expect(store.isLoaded()).toBeFalse();
        expect(store.displayedTrophies()).toEqual([]);
        expect(store.baseGameTrophies()).toEqual([]);
        expect(store.dlcs()).toEqual([]);
    }));

    it('should filter trophies depending on earned status', fakeAsync(() => {
        // Fetching mocked trophies
        store.retrieve(collectionId, playerId);
        flushMicrotasks();

        // Change filter to earned trophies only
        store.changeEarnedFilter('earned');
        expect(store.displayedTrophies()).toEqual([earnedBaseTrophy, earnedDlcTrophy]);
        expect(store.baseGameTrophies()).toEqual([earnedBaseTrophy]);
        expect(store.dlcs()).toEqual([{groupName: 'dlc', trophies: [earnedDlcTrophy]}]);

        // Change filter to notEarned trophies only
        store.changeEarnedFilter('notEarned');
        expect(store.displayedTrophies()).toEqual([baseTrophy, dlcTrophy]);
        expect(store.baseGameTrophies()).toEqual([baseTrophy]);
        expect(store.dlcs()).toEqual([{groupName: 'dlc', trophies: [dlcTrophy]}]);

        // Change filter to all trophies
        store.changeEarnedFilter('all');
        expect(store.displayedTrophies()).toEqual(trophies);
        expect(store.baseGameTrophies()).toEqual([baseTrophy, earnedBaseTrophy]);
        expect(store.dlcs()).toEqual([{groupName: 'dlc', trophies: [dlcTrophy, earnedDlcTrophy]}]);
    }));

});
