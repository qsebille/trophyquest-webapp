import {TestBed} from '@angular/core/testing';

import {TrophySetHttpService} from './trophy-set-http.service';
import {HttpClient} from "@angular/common/http";

describe('TrophySetHttpService', () => {
    let service: TrophySetHttpService;

    let httpSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers: [{provide: HttpClient, useValue: httpSpy}]
        });
        service = TestBed.inject(TrophySetHttpService);
    });

    it('should be created', () => expect(service).toBeTruthy());
});
