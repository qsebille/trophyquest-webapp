import {Component, computed, input} from '@angular/core';
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ValidationElementComponent} from "../validation-element/validation-element.component";
import {TrophySet} from "../../../core/models/dto/trophy-set";

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
    readonly trophySetList = input<TrophySet[]>([]);
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);

    isLoadingTrophySets = computed(() => this.status() === LoadingStatus.LOADING);
    hasFailedLoadingTrophySets = computed(() => this.status() === LoadingStatus.ERROR);
}
