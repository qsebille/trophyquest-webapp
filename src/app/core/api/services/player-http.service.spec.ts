import {TestBed} from '@angular/core/testing';

import {PlayerHttpService} from './player-http.service';
import {HttpClient} from '@angular/common/http';

describe('PlayerHttpService', () => {
    let service: PlayerHttpService;
    let httpSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

        TestBed.configureTestingModule({
            providers: [
                {provide: HttpClient, useValue: httpSpy},
            ]
        });
        service = TestBed.inject(PlayerHttpService);
    });

    it('should be created', () => expect(service).toBeTruthy());
});
