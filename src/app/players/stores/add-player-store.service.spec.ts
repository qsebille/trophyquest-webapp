import {TestBed} from '@angular/core/testing';

import {AddPlayerStore} from './add-player-store.service';
import {PlayerService} from "../../core/services/http/player.service";
import {PsnService} from "../../core/services/http/psn.service";

describe('AddPlayerStore', () => {
    let store: AddPlayerStore;

    let playerServiceSpy: jasmine.SpyObj<PlayerService>;
    let psnServiceSpy: jasmine.SpyObj<PsnService>;


    beforeEach(() => {
        playerServiceSpy = jasmine.createSpyObj('PlayerService', ['fetchByPseudo']);
        psnServiceSpy = jasmine.createSpyObj('PsnService', ['addPlayer']);

        TestBed.configureTestingModule({
            providers: [
                {provide: PlayerService, useValue: playerServiceSpy},
                {provide: PsnService, useValue: psnServiceSpy},
            ]
        });

        store = TestBed.inject(AddPlayerStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });
});
