import {Component, computed, input, output} from '@angular/core';
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ValidationElementComponent} from "../validation-element/validation-element.component";
import {TrophySetWithCandidates} from "../../../core/api/dtos/trophy-set/trophy-set-with-candidates";
import {ValidateCandidateStatus} from "../../../core/models/validate-candidate-status";

@Component({
    selector: 'tq-validation-list',
    imports: [
        ErrorMessageComponent,
        MatProgressSpinnerModule,
        ValidationElementComponent,
    ],
    templateUrl: './validation-list.component.html',
    styleUrl: './validation-list.component.scss',
})
export class ValidationListComponent {
    readonly trophySetList = input<TrophySetWithCandidates[]>([]);
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);
    readonly validationStatus = input<ValidateCandidateStatus>(ValidateCandidateStatus.NONE);
    readonly candidateAccepted = output<{ trophySetId: string, candidateId: number }>();

    isLoadingTrophySets = computed(() => this.status() === LoadingStatus.LOADING);
    hasFailedLoadingTrophySets = computed(() => this.status() === LoadingStatus.ERROR);

    acceptCandidate(trophySetId: string, candidateId: number): void {
        this.candidateAccepted.emit({trophySetId, candidateId});
    }
}
