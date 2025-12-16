import {TestBed} from '@angular/core/testing';

import {GameService} from './game.service';
import {HttpClient} from '@angular/common/http';

describe('GameService', () => {
    let service: GameService;
    let httpSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers: [GameService, {provide: HttpClient, useValue: httpSpy}]
        });
        service = TestBed.inject(GameService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call http client when searching games', () => {
        service.searchGames(0, 10);
        expect(httpSpy.get).toHaveBeenCalled();
    });

});
