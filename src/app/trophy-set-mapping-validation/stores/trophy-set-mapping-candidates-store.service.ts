import {computed, Injectable, signal} from '@angular/core';
import {TrophySetHttpService} from "../../core/api/services/trophy-set-http.service";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {TrophySetWithCandidates} from "../../core/api/dtos/trophy-set/trophy-set-with-candidates";

@Injectable({
    providedIn: 'root',
})
export class TrophySetMappingCandidatesStore {
    private readonly _pageSize = 20;
    private readonly _pageNumber = signal<number>(0);
    private readonly _total = signal<number>(0);
    private readonly _content = signal<TrophySetWithCandidates[]>([]);
    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);

    readonly trophySets = computed(() => this._content());
    readonly total = computed(() => this._total());
    readonly status = computed(() => this._status());


    constructor(private readonly _trophySetHttpService: TrophySetHttpService) {
    }

    reset(): void {
        this._pageNumber.set(0);
        this._content.set([]);
        this._total.set(0);
        this._status.set(LoadingStatus.NONE);
    }

    search(): void {
        this._status.set(LoadingStatus.LOADING);
        this._trophySetHttpService.searchWithCandidates(this._pageNumber(), this._pageSize).subscribe({
            next: searchResult => {
                const trophySets = [...this._content(), ...searchResult.content] as TrophySetWithCandidates[];
                const loadingStatus: LoadingStatus = trophySets.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
                this._content.update(() => trophySets);
                this._total.set(searchResult.total);
                this._status.set(loadingStatus);
            },
            error: error => {
                console.error(error);
                this._status.set(LoadingStatus.ERROR);
            }
        });
    }

    loadMore(): void {
        this._pageNumber.update(n => n + 1);
        this.search();
    }
}
