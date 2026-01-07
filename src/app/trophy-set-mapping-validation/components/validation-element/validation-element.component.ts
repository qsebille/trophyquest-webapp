import {Component, computed, input} from '@angular/core';
import {DEFAULT_TROPHY_SET, TrophySet} from "../../../core/models/dto/trophy-set";
import {PlatformLabelComponent} from "../../../core/components/platform-label/platform-label.component";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ValidationCandidateComponent} from "../validation-candidate/validation-candidate.component";

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
    readonly trophySet = input<TrophySet>(DEFAULT_TROPHY_SET);

    private readonly _candidates = computed(() => this.trophySet().igdbGameCandidates ?? []);
    readonly sortedCandidates = computed(() => this._candidates().sort((a, b) => b.score - a.score));
}
