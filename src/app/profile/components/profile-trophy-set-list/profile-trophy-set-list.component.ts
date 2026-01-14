import {Component, computed, input, output} from '@angular/core';
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {BlockComponent} from "../../../core/components/trophyquest-block/block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../../core/templates/block.template";
import {ProfileTrophySetCardComponent} from "../profile-trophy-set-card/profile-trophy-set-card.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {PlayedTrophySetSearchElement} from "../../../core/api/dtos/trophy-set/played-trophy-set-search-element";

@Component({
    selector: 'tq-profile-trophy-set-list',
    imports: [
        BlockComponent,
        BlockContentTemplate,
        BlockHeaderTemplate,
        MatProgressSpinnerModule,
        ProfileTrophySetCardComponent,
        ErrorMessageComponent
    ],
    templateUrl: './profile-trophy-set-list.component.html',
    styleUrl: './profile-trophy-set-list.component.scss',
})
export class ProfileTrophySetListComponent {
    readonly trophySets = input<PlayedTrophySetSearchElement[]>([]);
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);

    readonly clickOnGame = output<string>();
    readonly loadMoreGames = output();

    readonly isLoading = computed(() => this.status() === LoadingStatus.LOADING);
    readonly isError = computed(() => this.status() === LoadingStatus.ERROR);
    readonly hasMoreGamesToLoad = computed(() => this.status() === LoadingStatus.PARTIALLY_LOADED);
}
