import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ValidationCandidateComponent} from './validation-candidate.component';
import {IgdbGame} from "../../../core/models/dto/igdb-game";
import {signal} from "@angular/core";

describe('ValidationCandidateComponent', () => {
    let component: ValidationCandidateComponent;
    let fixture: ComponentFixture<ValidationCandidateComponent>;

    let mockCandidate = signal<IgdbGame>({
        id: 1,
        name: "Test Game",
        cover: "test.jpg",
        releaseDate: new Date(),
        score: 100
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ValidationCandidateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ValidationCandidateComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('candidate', mockCandidate());
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());

    it('should return the correct confidence level depending on score', () => {
        mockCandidate.update(c => ({...c, score: 100}));
        fixture.componentRef.setInput('candidate', mockCandidate());
        fixture.detectChanges();
        expect(component.confidence()).toEqual("very-high");

        mockCandidate.update(c => ({...c, score: 99}));
        fixture.componentRef.setInput('candidate', mockCandidate());
        fixture.detectChanges();
        expect(component.confidence()).toEqual("high");

        mockCandidate.update(c => ({...c, score: 75}));
        fixture.componentRef.setInput('candidate', mockCandidate());
        fixture.detectChanges();
        expect(component.confidence()).toEqual("high");

        mockCandidate.update(c => ({...c, score: 74}));
        fixture.componentRef.setInput('candidate', mockCandidate());
        fixture.detectChanges();
        expect(component.confidence()).toEqual("medium");

        mockCandidate.update(c => ({...c, score: 50}));
        fixture.componentRef.setInput('candidate', mockCandidate());
        fixture.detectChanges();
        expect(component.confidence()).toEqual("medium");

        mockCandidate.update(c => ({...c, score: 49}));
        fixture.componentRef.setInput('candidate', mockCandidate());
        fixture.detectChanges();
        expect(component.confidence()).toEqual("low");
    });
});
