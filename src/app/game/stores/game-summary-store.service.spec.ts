import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {GameSummaryStore} from './game-summary-store.service';
import {GameSummary} from "../../core/models/dto/game-summary";
import {of, throwError} from "rxjs";
import {GameService} from "../../core/services/http/game.service";
import {LoadingStatus} from "../../core/models/loading-status.enum";

describe('GameSummaryStore', () => {
    let store: GameSummaryStore;

    let gameServiceSpy: jasmine.SpyObj<GameService>;

    const mockSummary: GameSummary = {
        id: 'game-123',
        title: 'Game 123',
        platform: 'PS5',
        imageUrl: 'game.png',
        trophyCount: {platinum: 1, gold: 2, silver: 3, bronze: 4}
    };

    beforeEach(() => {
        gameServiceSpy = jasmine.createSpyObj('GameService', ['getSummary']);
        TestBed.configureTestingModule({
            providers: [
                {provide: GameService, useValue: gameServiceSpy},
            ]
        });

        store = TestBed.inject(GameSummaryStore);

        gameServiceSpy.getSummary.withArgs(mockSummary.id).and.returnValue(of(mockSummary));
        gameServiceSpy.getSummary.and.returnValue(throwError(() => new Error('Not Found')));
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });

    it('should update game when retrieve succeeds', fakeAsync(() => {
        store.retrieve(mockSummary.id);
        flushMicrotasks();

        expect(store.summary()).toEqual(mockSummary);
        expect(store.status()).toEqual(LoadingStatus.FULLY_LOADED);
    }));

    it('should handle failure in retrieve', fakeAsync(() => {
        store.retrieve('invalid-id');
        flushMicrotasks();

        expect(store.summary()).toBeNull();
        expect(store.status()).toEqual(LoadingStatus.ERROR);
    }));

    it('should reset state when reset is called', fakeAsync(() => {
        store.retrieve(mockSummary.id);
        flushMicrotasks();
        store.reset();

        expect(store.summary()).toBeNull();
        expect(store.status()).toEqual(LoadingStatus.NONE);
    }));
});
