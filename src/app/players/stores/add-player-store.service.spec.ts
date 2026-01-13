import {TestBed} from '@angular/core/testing';

import {AddPlayerStore} from './add-player-store.service';
import {PlayerHttpService} from "../../core/api/services/player-http.service";

describe('AddPlayerStore', () => {
    let store: AddPlayerStore;

    let playerServiceSpy: jasmine.SpyObj<PlayerHttpService>;

    beforeEach(() => {
        playerServiceSpy = jasmine.createSpyObj('PlayerService', ['fetchByPseudo', 'addPlayer']);

        TestBed.configureTestingModule({
            providers: [
                {provide: PlayerHttpService, useValue: playerServiceSpy},
            ]
        });

        store = TestBed.inject(AddPlayerStore);
    });

    it('should be created', () => expect(store).toBeTruthy());
});
