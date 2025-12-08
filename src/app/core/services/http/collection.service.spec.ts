import {TestBed} from '@angular/core/testing';

import {CollectionService} from './collection.service';
import {HttpClient} from "@angular/common/http";

describe('CollectionService', () => {
    let service: CollectionService;

    let httpSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers: [
                {provide: HttpClient, useValue: httpSpy},
            ]
        });
        service = TestBed.inject(CollectionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call http client when retrieving collection', () => {
        service.retrieve('collection-id');
        expect(httpSpy.get).toHaveBeenCalled();
    });
});
