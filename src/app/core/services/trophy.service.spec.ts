import {TestBed} from '@angular/core/testing';

import {TrophyService} from './trophy.service';
import {HttpClient} from '@angular/common/http';

describe('TrophyService', () => {
  let service: TrophyService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [TrophyService, {provide: HttpClient, useValue: httpSpy}]
    });
    service = TestBed.inject(TrophyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http client when searching last obtained trophies', () => {
    service.searchLastObtained(0, 20);
    expect(httpSpy.get).toHaveBeenCalled();
  });
  
});
