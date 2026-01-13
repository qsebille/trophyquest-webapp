import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ValidationPageComponent} from './validation-page.component';
import {TrophySetMappingCandidatesStore} from "../../stores/trophy-set-mapping-candidates-store.service";

describe('ValidationPageComponent', () => {
    let component: ValidationPageComponent;
    let fixture: ComponentFixture<ValidationPageComponent>;

    let mockStore: jasmine.SpyObj<TrophySetMappingCandidatesStore>;


    beforeEach(async () => {
        mockStore = jasmine.createSpyObj('TrophySetMappingCandidatesStore', ['reset', 'search', 'loadMore', 'trophySets', 'total', 'status']);

        await TestBed.configureTestingModule({
            imports: [ValidationPageComponent],
            providers: [
                {provide: TrophySetMappingCandidatesStore, useValue: mockStore}
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ValidationPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
