import {Component, computed, input, output} from '@angular/core';
import {BlockComponent} from "../../../core/components/trophyquest-block/block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../../core/templates/block.template";
import {ProfileTrophyCardComponent} from "../profile-trophy-card/profile-trophy-card.component";
import {Trophy} from "../../../core/models/dto/trophy";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
    selector: 'tq-profile-trophy-list',
    imports: [
        BlockComponent,
        BlockContentTemplate,
        BlockHeaderTemplate,
        MatProgressSpinnerModule,
        ProfileTrophyCardComponent
    ],
    templateUrl: './profile-trophy-list.component.html',
    styleUrl: './profile-trophy-list.component.scss',
})
export class ProfileTrophyListComponent {
    readonly trophies = input<Trophy[]>([]);
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);

    readonly loadMoreTrophies = output();

    readonly isLoading = computed(() => this.status() === LoadingStatus.LOADING);
    readonly hasMoreTrophiesToLoad = computed(() => this.status() === LoadingStatus.PARTIALLY_LOADED);
}
