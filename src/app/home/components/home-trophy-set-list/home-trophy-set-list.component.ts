import {Component, computed, input, output} from '@angular/core';
import {BlockComponent} from "../../../core/components/trophyquest-block/block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../../core/templates/block.template";
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {RecentTrophySet} from "../../../core/api/dtos/trophy-set/recent-trophy-set";
import {HomeTrophySetCardComponent} from "../home-trophy-set-card/home-trophy-set-card.component";

@Component({
    selector: 'tq-home-trophy-set-list',
    imports: [
        MatProgressSpinnerModule,
        ErrorMessageComponent,
        BlockComponent,
        BlockHeaderTemplate,
        BlockContentTemplate,
        HomeTrophySetCardComponent
    ],
    templateUrl: './home-trophy-set-list.component.html',
    styleUrl: './home-trophy-set-list.component.scss',
})
export class HomeTrophySetListComponent {
    readonly trophySets = input<RecentTrophySet[]>([]);
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);
    readonly clickOnTrophySet = output<string>();

    readonly isLoading = computed(() => this.status() === LoadingStatus.LOADING);
    readonly hasFailedLoading = computed(() => this.status() === LoadingStatus.ERROR);
    readonly isEmpty = computed(() => this.trophySets().length == 0 && this.status() === LoadingStatus.FULLY_LOADED);
}
