import {Component, computed, input, output} from '@angular/core';
import {PlatformLabelComponent} from "../../../core/components/platform-label/platform-label.component";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ValidationCandidateComponent} from "../validation-candidate/validation-candidate.component";
import {TrophySetWithCandidates} from "../../../core/api/dtos/trophy-set/trophy-set-with-candidates";
import {ValidateCandidateStatus} from "../../../core/models/validate-candidate-status";

@Component({
    selector: 'tq-validation-element',
    imports: [
        PlatformLabelComponent,
        MatButtonModule,
        MatProgressSpinnerModule,
        ValidationCandidateComponent,
    ],
    templateUrl: './validation-element.component.html',
    styleUrl: './validation-element.component.scss',
})
export class ValidationElementComponent {
    readonly trophySet = input.required<TrophySetWithCandidates>();
    readonly validationStatus = input<ValidateCandidateStatus>(ValidateCandidateStatus.NONE);
    readonly candidateAccepted = output<number>();
    readonly allRejected = output<void>();

    private readonly _candidates = computed(() => this.trophySet().mappingCandidates ?? []);
    readonly sortedCandidates = computed(() => this._candidates().sort((a, b) => b.score - a.score));

    readonly isRejectButtonDisabled = computed(() => this.validationStatus() === ValidateCandidateStatus.LOADING);

    acceptCandidate(candidateId: number): void {
        this.candidateAccepted.emit(candidateId);
    }

    rejectMapping(): void {
        this.allRejected.emit();
    }
}
