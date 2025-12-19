import {TestBed} from '@angular/core/testing';

import {PsnService} from './psn.service';
import {HttpClient} from "@angular/common/http";

describe('PsnService', () => {
    let service: PsnService;

    let httpSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers: [{provide: HttpClient, useValue: httpSpy}]
        });
        service = TestBed.inject(PsnService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
