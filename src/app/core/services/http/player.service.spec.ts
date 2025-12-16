import {TestBed} from '@angular/core/testing';

import {PlayerService} from './player.service';
import {HttpClient} from '@angular/common/http';

describe('PlayerService', () => {
    let service: PlayerService;
    let httpSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

        TestBed.configureTestingModule({
            providers: [
                {provide: HttpClient, useValue: httpSpy},
            ]
        });
        service = TestBed.inject(PlayerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

});
