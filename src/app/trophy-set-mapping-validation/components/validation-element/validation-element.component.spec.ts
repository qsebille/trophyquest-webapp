import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ValidationElementComponent} from './validation-element.component';
import {TrophySet} from "../../../core/api/dtos/trophy-set/trophy-set";
import {TrophySetWithCandidates} from "../../../core/api/dtos/trophy-set/trophy-set-with-candidates";

describe('ValidationElementComponent', () => {
    let component: ValidationElementComponent;
    let fixture: ComponentFixture<ValidationElementComponent>;

    const mockTrophySet = {id: 'ts-1', title: 'Set 1', image: 'set-1.jpg'} as TrophySet;
    const mockInput = {trophySet: mockTrophySet, mappingCandidates: []} as TrophySetWithCandidates;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ValidationElementComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ValidationElementComponent);
        fixture.componentRef.setInput('trophySet', mockInput);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
