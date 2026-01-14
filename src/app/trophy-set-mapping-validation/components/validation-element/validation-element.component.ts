import {Component, computed, input} from '@angular/core';
import {PlatformLabelComponent} from "../../../core/components/platform-label/platform-label.component";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ValidationCandidateComponent} from "../validation-candidate/validation-candidate.component";
import {TrophySetWithCandidates} from "../../../core/api/dtos/trophy-set/trophy-set-with-candidates";

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

    private readonly _candidates = computed(() => this.trophySet().mappingCandidates ?? []);
    readonly sortedCandidates = computed(() => this._candidates().sort((a, b) => b.score - a.score));
}
