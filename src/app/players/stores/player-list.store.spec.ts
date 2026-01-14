import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {PlayerListStore} from './player-list-store';
import {PlayerHttpService} from '../../core/api/services/player-http.service';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {of} from "rxjs";
import {PlayerSearchItem} from "../../core/api/dtos/player/player-search-item";

describe('PlayerListStore', () => {
    let store: PlayerListStore;

    let playerHttpServiceSpy: jasmine.SpyObj<PlayerHttpService>;

    beforeEach(() => {
        playerHttpServiceSpy = jasmine.createSpyObj<PlayerHttpService>('PlayerHttpService', ['search', 'count']);
        TestBed.configureTestingModule({
            providers: [
                {provide: PlayerHttpService, useValue: playerHttpServiceSpy},
            ]
        });
        store = TestBed.inject(PlayerListStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
        expect(store.results()).toEqual([]);
        expect(store.total()).toEqual(0);
        expect(store.status()).toEqual(LoadingStatus.NONE);
    });

    it('should search for players', fakeAsync(() => {
        const mockSearchResult = [
            {id: 'player-1', pseudo: 'John Doe'} as PlayerSearchItem,
        ];
        playerHttpServiceSpy.search.and.returnValue(of(mockSearchResult));
        playerHttpServiceSpy.count.and.returnValue(of(10));

        store.search();
        flushMicrotasks();

        expect(playerHttpServiceSpy.search).toHaveBeenCalledWith(0, 20);
        expect(playerHttpServiceSpy.count).toHaveBeenCalled();
        expect(store.results()).toEqual(mockSearchResult);
        expect(store.total()).toEqual(10);
        expect(store.status()).toEqual(LoadingStatus.PARTIALLY_LOADED);
    }));
});
