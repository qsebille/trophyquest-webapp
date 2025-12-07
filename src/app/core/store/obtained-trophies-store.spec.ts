import {TestBed} from '@angular/core/testing';

import {ObtainedTrophiesStore} from './obtained-trophies-store.service';
import {TrophyService} from '../services/trophy.service';
import {SearchResult} from '../models/dto/search-result';
import {ObtainedTrophy} from '../models/dto/obtained-trophy';
import {of} from 'rxjs';

describe('ObtainedTrophiesStore', () => {
  let service: ObtainedTrophiesStore;
  let trophyServiceSpy: jasmine.SpyObj<TrophyService>;

  beforeEach(() => {
    trophyServiceSpy = jasmine.createSpyObj<TrophyService>('TrophyService', ['searchLastObtained']);
    TestBed.configureTestingModule({
      providers: [
        {provide: TrophyService, useValue: trophyServiceSpy},
      ]
    });
    service = TestBed.inject(ObtainedTrophiesStore);
  });

  const mockSearchResults: SearchResult<ObtainedTrophy> = {
    content: [],
    total: 0
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reset state when reset is called', () => {
    service.resetState();
    expect(service.results()).toEqual([]);
    expect(service.isLoading()).toBeFalse();
    expect(service.hasMoreTrophies()).toBeFalse();
  });

  it('should call trophy service when searching last obtained trophies', () => {
    trophyServiceSpy.searchLastObtained.and.returnValue(of(mockSearchResults));
    service.search();
    expect(trophyServiceSpy.searchLastObtained).toHaveBeenCalled();
  });

  it('should call trophy service when loading more obtained trophies', () => {
    trophyServiceSpy.searchLastObtained.and.returnValue(of(mockSearchResults));
    service.loadMore();
    expect(trophyServiceSpy.searchLastObtained).toHaveBeenCalled();
  });
});
