import {TestBed} from '@angular/core/testing';

import {TrophySetMappingCandidatesStore} from './trophy-set-mapping-candidates-store.service';
import {TrophySetHttpService} from "../../core/services/http/trophy-set-http.service";

describe('TrophySetMappingCandidatesStore', () => {
    let store: TrophySetMappingCandidatesStore;

    let httpServiceSpy: jasmine.SpyObj<TrophySetHttpService>;

    beforeEach(() => {
        httpServiceSpy = jasmine.createSpyObj('TrophySetHttpService', ['search']);
        TestBed.configureTestingModule({
            providers: [{provide: TrophySetHttpService, useValue: httpServiceSpy}]
        });
        store = TestBed.inject(TrophySetMappingCandidatesStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });
});
