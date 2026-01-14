import {TestBed} from '@angular/core/testing';

import {TrophyHttpService} from './trophy-http.service';
import {HttpClient} from '@angular/common/http';

describe('TrophyHttpService', () => {
    let service: TrophyHttpService;
    let httpSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers: [TrophyHttpService, {provide: HttpClient, useValue: httpSpy}]
        });
        service = TestBed.inject(TrophyHttpService);
    });

    it('should be created', () => expect(service).toBeTruthy());

});
