import {Component, computed, OnInit} from '@angular/core';
import {BlockComponent} from "../../../core/components/trophyquest-block/block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../../core/templates/block.template";
import {ValidationListComponent} from "../validation-list/validation-list.component";
import {TrophySetMappingCandidatesStore} from "../../stores/trophy-set-mapping-candidates-store.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
    imports: [
        BlockComponent,
        BlockContentTemplate,
        BlockHeaderTemplate,
        ValidationListComponent,
        MatProgressSpinnerModule,
    ],
    templateUrl: './validation-page.component.html',
    styleUrl: './validation-page.component.scss',
})
export class ValidationPageComponent implements OnInit {
    constructor(private readonly _trophySetMappingStore: TrophySetMappingCandidatesStore) {
    }

    trophySetList = computed(() => this._trophySetMappingStore.trophySets());
    searchStatus = computed(() => this._trophySetMappingStore.status());
    validationStatus = computed(() => this._trophySetMappingStore.validationStatus())

    ngOnInit(): void {
        this._trophySetMappingStore.resetSearch();
        this._trophySetMappingStore.search();
    }

    acceptMapping(event: { trophySetId: string, candidateId: number }): void {
        this._trophySetMappingStore.validateCandidate(event.trophySetId, event.candidateId);
    }
}
