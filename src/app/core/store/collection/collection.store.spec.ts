import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {CollectionStore} from './collection.store';
import {CollectionService} from "../../services/http/collection.service";
import {Collection} from "../../models/dto/collection";
import {of, throwError} from "rxjs";

describe('CollectionStore', () => {
    let store: CollectionStore;

    let collectionServiceSpy: jasmine.SpyObj<CollectionService>;

    const mockCollection: Collection = {
        id: 'collection-123',
        title: 'My collection',
        platform: 'PS5',
        imageUrl: 'collection.png',
        gameId: 'game-123',
        gameTitle: 'Game Name',
        gameImageUrl: 'game.png',
        trophyCount: {platinum: 1, gold: 2, silver: 3, bronze: 4}
    };

    beforeEach(() => {
        collectionServiceSpy = jasmine.createSpyObj('CollectionService', ['retrieve']);
        TestBed.configureTestingModule({
            providers: [
                {provide: CollectionService, useValue: collectionServiceSpy},
            ]
        });

        store = TestBed.inject(CollectionStore);

        collectionServiceSpy.retrieve
            .withArgs(mockCollection.id)
            .and.returnValue(of(mockCollection));
        collectionServiceSpy.retrieve
            .and.returnValue(throwError(() => new Error('Not Found')));
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });

    it('should update collection when retrieve succeeds', fakeAsync(() => {
        store.retrieve(mockCollection.id);
        flushMicrotasks();

        expect(store.collection()).toEqual(mockCollection);
        expect(store.isLoading()).toBeFalse();
        expect(store.isError()).toBeFalse();
        expect(store.isLoaded()).toBeTrue();
    }));

    it('should handle failure in retrieve', fakeAsync(() => {
        store.retrieve('invalid-id');
        flushMicrotasks();

        expect(store.collection()).toBeNull();
        expect(store.isLoading()).toBeFalse();
        expect(store.isError()).toBeTrue();
    }));

    it('should reset state when reset is called', fakeAsync(() => {
        store.retrieve(mockCollection.id);
        flushMicrotasks();
        store.reset();

        expect(store.collection()).toBeNull();
        expect(store.isLoading()).toBeFalse();
        expect(store.isError()).toBeFalse();
        expect(store.isLoaded()).toBeFalse();
    }));
});
