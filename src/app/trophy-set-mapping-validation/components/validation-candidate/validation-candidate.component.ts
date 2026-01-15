import {Component, computed, input, output} from '@angular/core';
import {IgdbGame} from "../../../core/models/dto/igdb-game";
import {DatePipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTooltipModule} from '@angular/material/tooltip';
import {ValidateCandidateStatus} from "../../../core/models/validate-candidate-status";

@Component({
    selector: 'tq-validation-candidate',
    imports: [
        DatePipe,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatTooltipModule
    ],
    templateUrl: './validation-candidate.component.html',
    styleUrl: './validation-candidate.component.scss',
})
export class ValidationCandidateComponent {
    readonly candidate = input.required<IgdbGame>();
    readonly validationStatus = input<ValidateCandidateStatus>(ValidateCandidateStatus.NONE);
    readonly candidateAccepted = output<number>();

    readonly isValidationDisabled = computed(() => this.validationStatus() === ValidateCandidateStatus.LOADING);

    readonly confidence = computed((): 'very-high' | 'high' | 'medium' | 'low' => {
        if (this.candidate().score === 100) {
            return "very-high"
        } else if (this.candidate().score >= 75) {
            return "high"
        } else if (this.candidate().score >= 50) {
            return "medium"
        } else {
            return "low"
        }
    });

    acceptCandidate(): void {
        this.candidateAccepted.emit(this.candidate().id);
    }
}
