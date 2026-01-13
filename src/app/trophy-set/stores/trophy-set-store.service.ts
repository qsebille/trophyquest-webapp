import {computed, Injectable, signal} from '@angular/core';
import {EMPTY_TROPHY_SET, TrophySet} from "../../core/api/dtos/trophy-set/trophy-set";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {TrophySetHttpService} from "../../core/api/services/trophy-set-http.service";
import {EarnedTrophy} from "../../core/api/dtos/trophy/earned-trophy";
import {forkJoin} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class TrophySetStore {
    private readonly _trophySet = signal<TrophySet>(EMPTY_TROPHY_SET);
    private readonly _trophies = signal<EarnedTrophy[]>([]);
    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);

    readonly trophySet = computed(() => this._trophySet());
    readonly trophies = computed(() => this._trophies());
    readonly status = computed(() => this._status());

    constructor(private readonly _trophySetHttpService: TrophySetHttpService) {
    }

    reset(): void {
        this._trophySet.set(EMPTY_TROPHY_SET);
        this._trophies.set([]);
        this._status.set(LoadingStatus.NONE);
    }

    retrieve(trophySetId: string, playerId: string | null): void {
        this._status.set(LoadingStatus.LOADING);

        forkJoin({
            trophySet: this._trophySetHttpService.fetch(trophySetId),
            trophies: this._trophySetHttpService.fetchTrophies(trophySetId, playerId),
        }).subscribe({
            next: ({trophySet, trophies}) => {
                this._trophySet.set(trophySet);
                this._trophies.set(trophies);
                this._status.set(LoadingStatus.FULLY_LOADED);
            }, error: error => {
                console.error('Failed loading trophy set infos', error);
                this._status.set(LoadingStatus.ERROR);
            }
        });
    }
}
